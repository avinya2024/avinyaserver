const { registrationSchema } = require("../models/register");

const Razorpay = require('razorpay');
const razorpay = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret:process.env.KEY_SECRET
});

module.exports.order = async (req, res) => {
    try {
        let { amount } = req.body;
        console.log(amount);

        const order = await razorpay.orders.create({
            amount: amount,
            currency: "INR",
            receipt: "rcptid_11",
        });
    
        console.log("Order created:", order);
    
        // Now you can access the properties of the order object
        res.json({
            orderId: order.id,
            razorpayKey: razorpay.key_id,
            amount: order.amount, // This is in paise
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create order' });
    }
}
module.exports.verification = async (req, res) => {
    try {
        let body = req.body.response.razorpay_order_id + "|"+req.body.response.razorpay_payment_id;
        var crypto = require('crypto');
        var expectedSignature = crypto.createHmac('sha256',process.env.KEY_SECRET)
        .update(body.toString()).digest('hex');
        console.log("signature received: "+req.body.response.razorpay_signature);
        console.log("expected siignature: "+expectedSignature)
        var response = {
            "signatureIsValid": "false"
        }
        if(expectedSignature == req.body.response.razorpay_signature){
            response= {
                "signatureIsValid": "true"
            }
            res.status(200).json({razorpay_payment_id: req.body.response.razorpay_payment_id, razorpay_signature: expectedSignature})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to verify payment' });
    }
}
module.exports.registration = async(req,res,next)=>{
    try{
        if(req.method === 'POST'){
            const {teamName, teamMembers, teamLeaderName, teamLeaderPhone, teamLeaderEmail, member2Name, member2Email, member3Name, member3Email, department, college, transactionID, paidAmount} = req.body;
            const isValidEmail = await registrationSchema.findOne({email: teamLeaderEmail});
            const isValidEmail2 = await registrationSchema.findOne({member2Email: member2Email});
            const isValidEmail3 = await registrationSchema.findOne({member3Email: member3Email});
            const isValidPhone = await registrationSchema.findOne({teamLeaderPhone: teamLeaderPhone});
            if(isValidEmail && teamLeaderEmail != ""){
                let transactions = isValidEmail.transactionId
                transactions.push(transactionID)
                let amt = isValidEmail.paidAmount + paidAmount 
                await registrationSchema.findByIdAndUpdate(isValidEmail._id,{hackathon: true, paidAmount: amt, transactionId: transactions})
                return res.status(200).json({message:"Success"})
            }
            if(isValidEmail2 && member2Email!=""){
                let transactions = isValidEmail2.transactionId
                transactions.push(transactionID)
                let amt = isValidEmail2.paidAmount + paidAmount 
                await registrationSchema.findByIdAndUpdate(isValidEmail2._id,{hackathon: true, paidAmount: amt, transactionId: transactions})
                return res.status(200).json({message:"Success"})
            }
            if(isValidEmail3 && member3Email!=""){
                let transactions = isValidEmail3.transactionId
                transactions.push(transactionID)
                let amt = isValidEmail3.paidAmount + paidAmount 
                await registrationSchema.findByIdAndUpdate(isValidEmail3._id,{hackathon: true, paidAmount: amt, transactionId: transactions})
                return res.status(200).json({message:"Success"})
            }
            else if(isValidPhone){
                let transactions = isValidPhone.transactionId
                transactions.push(transactionID)
                let amt = isValidPhone.paidAmount + paidAmount 
                await registrationSchema.findByIdAndUpdate(isValidPhone._id,{hackathon:true, paidAmount: amt, transactionId: transactions})
                return res.status(200).json({message:"Success"})
            }else{
                let transactions = [];
                transactions.push(transactionID)
                console.log(transactions);
                const data = await registrationSchema.create({
                    teamName: teamName,
                    teamMembers: teamMembers,
                    teamLeaderName: teamLeaderName,
                    teamLeaderEmail: teamLeaderEmail,
                    teamLeaderPhone: teamLeaderPhone,
                    member2Name: member2Name,
                    member2Email: member2Email,
                    member3Name: member3Name,
                    member3Email: member3Email,
                    department: department,
                    college: college,
                    hackathon: true,
                    exhibition: true,
                    transactionId: transactions,
                    paidAmount: paidAmount
                }).then(()=>{
                    res.status(200).json({message: "Created"})
                }).catch((err)=>{
                    console.log(err);
                    res.status(400).json({message: "Unable to create"})
                })
            }
            

        }
        else if(req.method === 'PUT'){
            console.log("Here");
            const {teamLeaderName, teamLeaderPhone, teamLeaderEmail, department, college, techexpert, nontechexpert,transactionID, paidAmount} = req.body;
            const isValidEmail = await registrationSchema.findOne({teamLeaderEmail: teamLeaderEmail});
            const isValidEmail2 = await registrationSchema.findOne({member2Email: teamLeaderEmail});
            const isValidEmail3 = await registrationSchema.findOne({member3Email: teamLeaderEmail});
            const isValidPhone = await registrationSchema.findOne({teamLeaderPhone: teamLeaderPhone});
            if(isValidEmail && teamLeaderEmail!=""){
                let transactions = isValidEmail.transactionId
                transactions.push(transactionID)
                let amt = isValidEmail.paidAmount + paidAmount 
                await registrationSchema.findByIdAndUpdate(isValidEmail._id,{techexpert:techexpert,nontechexpert:nontechexpert, paidAmount: amt, transactionId: transactions})
                return res.status(200).json({message:"Success"})
            }
            else if(isValidEmail2 && teamLeaderEmail!=""){
                let transactions = isValidEmail2.transactionId
                transactions.push(transactionID)
                let amt = isValidEmail2.paidAmount + paidAmount 
                await registrationSchema.findByIdAndUpdate(isValidEmail2._id,{techexpert:techexpert,nontechexpert:nontechexpert, paidAmount: amt, transactionId: transactions})
                return res.status(200).json({message:"Success"})
            }
            else if(isValidEmail3 && teamLeaderEmail!=""){
                let transactions = isValidEmail3.transactionId
                transactions.push(transactionID)
                let amt = isValidEmail3.paidAmount + paidAmount 
                await registrationSchema.findByIdAndUpdate(isValidEmail3._id,{techexpert:techexpert,nontechexpert:nontechexpert, paidAmount: amt, transactionId: transactions})
                return res.status(200).json({message:"Success"})
            }
            else if(isValidPhone){
                let transactions = isValidPhone.transactionId
                transactions.push(transactionID)
                let amt = isValidPhone.paidAmount + paidAmount 
                await registrationSchema.findByIdAndUpdate(isValidPhone._id,{techexpert:techexpert,nontechexpert:nontechexpert, paidAmount: amt, transactionId: transactions})
                return res.status(200).json({message:"Success"})
            }else{
                let transactions = []
                transactions.push(transactionID)
                await registrationSchema.create({
                    teamLeaderName: teamLeaderName,
                    teamLeaderEmail: teamLeaderEmail,
                    teamLeaderPhone: teamLeaderPhone,
                    department: department,
                    college: college,
                    exhibition: true,
                    techexpert: techexpert,
                    nontechexpert: nontechexpert,
                    transactionId: transactions,
                    paidAmount: paidAmount
                }).then(()=>{
                    res.status(200).json({message: "Created"});
                }).catch((err)=>{
                    res.status(400).json({message: "Unable to create "+err})
                })
            }
        }
        else if(req.method === 'PATCH'){
            const {email, contact} = req.body;
            if(email!==""){
                const isValidEmail = await registrationSchema.findOne({teamLeaderEmail: email, hackathon: true});
                const isValidEmail2 = await registrationSchema.findOne({member2Email: email, hackathon: true});
                const isValidEmail3 = await registrationSchema.findOne({member3Email: email, hackathon: true});
                if(isValidEmail){
                    return res.status(200).json({status: true});
                }
                if(isValidEmail2){
                    return res.status(200).json({status: true});
                }
                if(isValidEmail3){
                    return res.status(200).json({status: true});
                }
            }
            if(contact!==""){
                const isValidPhone = await registrationSchema.findOne({teamLeaderPhone: contact, hackathon: true})
                if(isValidPhone){
                    return res.status(200).json({status: true, message: "Please use the email used for hackathon registration"})
                }
            }
            return res.status(200).json({status: false})
        }
    }catch(err){
        next(err)
    }
}
module.exports.search = async(req,res,next)=>{
    try{
        const {email, contact} = req.body;
            if(contact === ""){
                let isValidEmail = await registrationSchema.findOne({teamLeaderEmail: email, techexpert: true});
                let isValidEmail2 = await registrationSchema.findOne({member2Email: email, techexpert: true});
                let isValidEmail3 = await registrationSchema.findOne({member3Email: email, techexpert: true});
                if(isValidEmail){
                    return res.status(200).json({status: true});
                }
                if(isValidEmail2){
                    return res.status(200).json({status: true});
                }
                if(isValidEmail3){
                    return res.status(200).json({status: true});
                }
                else{
                    isValidEmail = await registrationSchema.findOne({teamLeaderEmail: email, nontechexpert: true});
                    isValidEmail2 = await registrationSchema.findOne({member2Email: email, nontechexpert: true});
                    isValidEmail3 = await registrationSchema.findOne({member3Email: email, nontechexpert: true});
                    if(isValidEmail){
                        return res.status(200).json({status: true});
                    }
                    if(isValidEmail2){
                        return res.status(200).json({status: true});
                    }
                    if(isValidEmail3){
                        return res.status(200).json({status: true});
                    }
                    return res.status(400).json({status: false});
                }
            }
            if(email === ""){
                let isValidPhone = await registrationSchema.findOne({teamLeaderPhone: contact, techexpert: true});
                if(isValidPhone){
                    return res.status(200).json({status: true})
                }else{
                    isValidPhone = await registrationSchema.findOne({teamLeaderPhone: contact, nontechexpert: true});
                    if(isValidPhone){
                        return res.status(200).json({status: true})
                    }else{
                        return res.status(200).json({status: false})

                    }
                }
            }
        }catch(err){
        next(err)
    }
}