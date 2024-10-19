const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Node Schema for the AST
const NodeSchema = new Schema({
  type: {
    type: String,
    enum: ['operator', 'operand'],
    required: true,
  },
  value: {
    type: Schema.Types.Mixed, // String, number, or object depending on the type
  },
  left: {
    type: Schema.Types.Mixed, // Reference to another Node (if operator)
  },
  right: {
    type: Schema.Types.Mixed, // Reference to another Node (if operator)
  },
});

// Rule Schema
const RuleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  ast: {
    type: NodeSchema, // Root of the AST structure
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Rule', RuleSchema);
