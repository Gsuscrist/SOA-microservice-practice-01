import {OrderRepository} from "../../domain/repository/orderRepository";

export class ChangeStatusOrderUseCase{
    constructor(readonly repository:OrderRepository) {
    }

    async run(id:string,status:string){
        try {
            return await this.repository.changeStatus(id,status)
        }catch (e) {
            return null
        }
    }

    async runView(orderId:string){
        try {
            return await this.repository.getOrderProducts(orderId)
        }catch (e) {
            return null
        }
    }
}