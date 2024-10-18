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

// // Static method to create a new rule
// RuleSchema.statics.createRule = function (ruleData) {
//   const rule = new this(ruleData);
//   return rule.save();
// };

// // Static method to find rule by ID
// RuleSchema.statics.findByRuleId = function (ruleId) {
//   return this.findById(ruleId);
// };

// // Static method to update an existing rule
// RuleSchema.statics.updateRule = function (ruleId, updateData) {
//   return this.findByIdAndUpdate(ruleId, updateData, { new: true });
// };

// // Static method to delete a rule
// RuleSchema.statics.deleteRule = function (ruleId) {
//   return this.findByIdAndDelete(ruleId);
// };

// Export the Rule model
module.exports = mongoose.model('Rule', RuleSchema);
