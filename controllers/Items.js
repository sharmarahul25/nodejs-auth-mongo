
const Items = require('../models/Item');

module.exports = {
	addItem: async function(req,res){
		let itemObj = req.body;
		try {
			let item  = await Items.create(itemObj)
			res.status(200).json(item);
		} catch(err){
			res.status(500).json({error:err, message:"coudn't create the item"})
		}
	},
	listItems: async function (req, res){
		console.log("in list items after authorization", req.query);
		let queryObj = {}
		if(req.query.type)
			queryObj.type = req.query.type 
		// get the list of items from DB and send as response
		try{
			const items = await Items.find(queryObj)
			return res.status(200).json(items)
		} catch (err) {
			return res.status(500).json({message:"Items not found"})
		}
	}
};