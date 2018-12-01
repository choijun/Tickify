var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TicketSchema   = new Schema({
    category: String,
    priority: Number,
    title: String,
    content: String,
    assigned: String,
    raised: String,
    date: Date,
    lastupdated: Date
});

module.exports = mongoose.model('Ticket', TicketSchema);
