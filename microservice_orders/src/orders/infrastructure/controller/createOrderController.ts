import {Request, Response} from "express";
import {CreateOrderUseCase} from "../../application/useCase/createOrderUseCase";

export class CreateOrderController {
    constructor(readonly useCase:CreateOrderUseCase) {
    }

    async run(req:Request,res:Response){
        try {
            const {date,status} = req.body
            const {productId,units,total} = req.body.product
            const order = await this.useCase.run(productId,units,total,date,status)
            if (order){
                return res.status(201).send({
                    status:"Success",
                    data:order,
                    message:"order create success"
                })
            }
            return res.status(417).send({
                status:"error",
                data:[],
                message:"order create fail"
            })
        }catch (e) {
            console.log("request error",e)
            return res.status(400).send({
                message:"error",
                error:e
            })
        }
    }
}