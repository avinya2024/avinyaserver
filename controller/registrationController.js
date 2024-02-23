const { registrationSchema } = require("../models/register");

module.exports.registration = async(req,res,next)=>{
    try{
        if(req.method === 'POST'){
            const {teamName, teamMembers, teamLeaderName, teamLeaderPhone, teamLeaderEmail, member2Name, member2Email, member3Name, member3Email, department, college, transactionID, paidAmount} = req.body;
            const isValidEmail = await registrationSchema.findOne({email: teamLeaderEmail});
            const isValidEmail2 = await registrationSchema.findOne({member2Email: member2Email});
            const isValidEmail3 = await registrationSchema.findOne({member3Email: member3Email});
            if(isValidEmail){
                let transactions = isValidEmail.transactionId
                transactions.push(transactionID)
                let amt = isValidEmail.paidAmount + paidAmount 
                await registrationSchema.findByIdAndUpdate(isValidEmail._id,{hackathon: true, paidAmount: amt, transactionId: transactions})
                return res.status(200).json({message:"Success"})
            }
            if(isValidEmail2){
                let transactions = isValidEmail.transactionId
                transactions.push(transactionID)
                let amt = isValidEmail.paidAmount + paidAmount 
                await registrationSchema.findByIdAndUpdate(isValidEmail._id,{hackathon: true, paidAmount: amt, transactionId: transactions})
                return res.status(200).json({message:"Success"})
            }
            if(isValidEmail3){
                let transactions = isValidEmail.transactionId
                transactions.push(transactionID)
                let amt = isValidEmail.paidAmount + paidAmount 
                await registrationSchema.findByIdAndUpdate(isValidEmail._id,{hackathon: true, paidAmount: amt, transactionId: transactions})
                return res.status(200).json({message:"Success"})
            }
            const isValidPhone = await registrationSchema.findOne({teamLeaderPhone: teamLeaderPhone});
            if(isValidPhone){
                return res.status(400).json({message: "Phone already registered"});
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
            if(isValidEmail){
                let transactions = isValidEmail.transactionId
                transactions.push(transactionID)
                let amt = isValidEmail.paidAmount + paidAmount 
                await registrationSchema.findByIdAndUpdate(isValidEmail._id,{techexpert:techexpert,nontechexpert:nontechexpert, paidAmount: amt, transactionId: transactions})
                return res.status(200).json({message:"Success"})
            }
            if(isValidEmail2){
                let transactions = isValidEmail.transactionId
                transactions.push(transactionID)
                let amt = isValidEmail.paidAmount + paidAmount 
                await registrationSchema.findByIdAndUpdate(isValidEmail._id,{techexpert:techexpert,nontechexpert:nontechexpert, paidAmount: amt, transactionId: transactions})
                return res.status(200).json({message:"Success"})
            }
            if(isValidEmail3){
                let transactions = isValidEmail.transactionId
                transactions.push(transactionID)
                let amt = isValidEmail.paidAmount + paidAmount 
                await registrationSchema.findByIdAndUpdate(isValidEmail._id,{techexpert:techexpert,nontechexpert:nontechexpert, paidAmount: amt, transactionId: transactions})
                return res.status(200).json({message:"Success"})
            }
            const isValidPhone = await registrationSchema.findOne({teamLeaderPhone: teamLeaderPhone});
            if(isValidPhone){
                return res.status(400).json({message: "Phone already registered"});
            }else{
                let transactions = []
                transactions.push(transactionID)
                await registrationSchema.create({
                    teamName: teamName,
                    teamMembers: teamMembers,
                    teamLeaderName: teamLeaderName,
                    teamLeaderEmail: teamLeaderEmail,
                    teamLeaderPhone: teamLeaderPhone,
                    department: department,
                    college: college,
                    hackathon: isValidEmail.hackathon,
                    exhibition: true,
                    expert: true,
                    transactionId: transactions,
                    paidAmount: paidAmount+isValidEmail.paidAmount
                }).then(()=>{
                    res.status(200).json({message: "Created"});
                }).catch((err)=>{
                    res.status(400).json({message: "Unable to create "+err})
                })
            }
        }
        else if(req.method === 'PATCH'){
            const {email} = req.body;
            const isValidEmail = await registrationSchema.findOne({teamLeaderEmail: email});
            const isValidEmail2 = await registrationSchema.findOne({member2Email: email});
            const isValidEmail3 = await registrationSchema.findOne({member3Email: email});
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
                return res.status(400).json({status: false});
            }
        }
    }catch(err){
        next(err)
    }
}