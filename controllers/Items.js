
module.exports = {
	listItems: function (req, res){
		console.log("in list items after authorization", req.query);
		// get the list of items from DB and send as response
		return res.status(200).json({message:"success", items:{}})
	}
};