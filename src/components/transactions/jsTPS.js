//package jtps;
import React, {Component} from 'react';
/**
 * jTPS.java
 * 
 * This class is used for managing an abstract transaction processing
 * system for the purpose of managing an undo/redo system for an
 * application. Note that one must specify all work done via custom
 * transactions.
 * 
 * @author THE McKilla Gorilla (accept no imposters)
 * @version 2.0
 */
export class jsTPS extends Component{

    // THE TRANSACTION STACK
    transactions = [];
    state ={
        // KEEPS TRACK OF WHERE WE ARE IN THE STACK, THUS AFFECTING WHAT
        // TRANSACTION MAY BE DONE OR UNDONE AT ANY GIVEN TIME
        mostRecentTransaction: -1,
        
        // THESE VARIABLES CAN BE TURNED ON AND OFF TO SIGNAL THAT
        // DO AND UNDO OPERATIONS ARE BEING PERFORMED
        performingDo: false,
        performingUndo: false,
    }

    /**
     * Tests to see if the do (i.e. redo) operation is currently being
     * performed. If it is, true is returned, if not, false.
     * 
     * @return true if the do (i.e. redo) operation is currently in the
     * process of executing, false otherwise.
     */
    isPerformingDo=()=>{
        return this.state.performingDo;
    }
    
    /**
     * Tests to see if the undo operation is currently being
     * performed. If it is, true is returned, if not, false.
     * 
     * @return true if the undo operation is currently in the
     * process of executing, false otherwise.
     */
    isPerformingUndo=()=>{
        return this.state.performingUndo;
    }
    
    /**
     * This function adds the transaction argument to the top of
     * the transaction processing system stack and then executes it. Note that it does
     * When this method has completed transaction will be at the top 
     * of the stack, it will have been completed, and the counter have
     * been moved accordingly.
     * 
     * @param transaction The custom transaction to be added to
     * the transaction processing system stack and executed.
     */
    addTransaction=(transaction)=>{
        // ARE THERE OLD UNDONE TRANSACTIONS ON THE STACK THAT FIRST
        // NEED TO BE CLEARED OUT, i.e. ARE WE BRANCHING?
        if ((this.state.mostRecentTransaction < 0)|| (this.state.mostRecentTransaction < (this.transactions.length-1))) {
            for (var i = this.transactions.length -1; i > this.state.mostRecentTransaction; i--) {
                this.transactions.splice(i);
            }
        }

        // AND NOW ADD THE TRANSACTION
        this.transactions.push(transaction);

        // AND EXECUTE IT
        this.doTransaction();        
    }

    /**
     * This function executes the transaction at the location of the counter,
     * then moving the TPS counter. Note that this may be the transaction
     * at the top of the TPS stack or somewhere in the middle (i.e. a redo).
     */
    doTransaction() {
        if (this.hasTransactionToRedo()) {
            this.setState({performingDo: true});
            var transaction = this.transactions[this.state.mostRecentTransaction+1];
            transaction.doTransaction();
            this.state.mostRecentTransaction++;
            this.setState({performingDo: false});
        }
    }
    
    /**
     * This function checks to see if there is a transaction to undo. If there
     * is it will return it, if not, it will return null.
     * 
     * @return The transaction that would be executed if undo is performed, if
     * there is no transaction to undo, null is returned.
     */
    peekUndo() {
        if (this.hasTransactionToUndo()) {
            return this.transactions.get(this.mostRecentTransaction);
        }
        else
            return null;
    }
    
    /**
     * This function checks to see if there is a transaction to redo. If there
     * is it will return it, if not, it will return null.
     * 
     * @return The transaction that would be executed if redo is performed, if
     * there is no transaction to undo, null is returned.
     */    
    peekDo() {
        if (this.hasTransactionToRedo()) {
            return this.transactions.get(this.state.mostRecentTransaction+1);
        }
        else
            return null;
    }

    /**
     * This function gets the most recently executed transaction on the 
     * TPS stack and undoes it, moving the TPS counter accordingly.
     */
    undoTransaction() {
        if (this.hasTransactionToUndo()) {
            this.performingUndo = true;
            var transaction = this.transactions[this.state.mostRecentTransaction];
            transaction.undoTransaction();
            this.state.mostRecentTransaction--;
            this.setState({performingUndo: false});
        }
    }

    /**
     * This method clears all transactions from the TPS stack
     * and resets the counter that keeps track of the location
     * of the top of the stack.
     */
    clearAllTransactions() {
        // REMOVE ALL THE TRANSACTIONS
        this.transactions.clear();
        
        // MAKE SURE TO RESET THE LOCATION OF THE
        // TOP OF THE TPS STACK TOO
        this.state.mostRecentTransaction = -1;        
    }
    
    /**
     * Accessor method that returns the number of transactions currently
     * on the transaction stack. This includes those that may have been
     * done, undone, and redone.
     * 
     * @return The number of transactions currently in the transaction stack.
     */
    getSize() {
        return this.transactions.size();
    }
    
    /**
     * This method returns the number of transactions currently in the
     * transaction stack that can be redone, meaning they have been added
     * and done, and then undone.
     * 
     * @return The number of transactions in the stack that can be redone.
     */
    getRedoSize() {
        return this.getSize() - this.state.mostRecentTransaction - 1;
    }

    /**
     * This method returns the number of transactions currently in the 
     * transaction stack that can be undone.
     * 
     * @return The number of transactions in the transaction stack that
     * can be undone.
     */
    getUndoSize() {
        return this.state.mostRecentTransaction + 1;
    }
    
    /**
     * This method tests to see if there is a transaction on the stack that
     * can be undone at the time this function is called.
     * 
     * @return true if an undo operation is possible, false otherwise.
     */
    hasTransactionToUndo() {
        return this.state.mostRecentTransaction >= 0;
    }
    
    /**
     * This method tests to see if there is a transaction on the stack that
     * can be redone at the time this function is called.
     * 
     * @return true if a redo operation is possible, false otherwise.
     */
    hasTransactionToRedo() {
        return this.state.mostRecentTransaction < (this.transactions.length-1);
    }
        
    /**
     * This method builds and returns a textual summary of the current
     * Transaction Processing System, this includes the toString of
     * each transaction in the stack.
     * 
     * @return A textual summary of the TPS.
     */
    toString() {
        var text = "--Number of Transactions: " + this.transactions.size() + "\n";
        text += "--Current Index on Stack: " + this.state.mostRecentTransaction + "\n";
        text += "--Current Transaction Stack:\n";
        for (var i = 0; i <= this.state.mostRecentTransaction; i++) {
            var jT = this.transactions.get(i);
            text += "----" + jT.toString() + "\n";
        }
        return text;
    }
}
export default jsTPS;