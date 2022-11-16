import { Injectable } from '@nestjs/common'
import { RESTDataSource } from 'apollo-datasource-rest'
import DataLoader from 'dataloader'

@Injectable()
export class DatasourceService extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = 'https://pure-bayou-14335.herokuapp.com/https://api.covalenthq.com/v1/56/',
        this.initialize({} as any)
    }

    // private progressLoader = new DataLoader(async (addresses: string[]) => {

    //     console.log(addresses)

    //     const progressList = await this.get(`address/${ addresses }/balances_v2/?&key=${ process.env.COVALENTHQ_SECRET }`, undefined, {
    //         headers: {
    //             'Accept': '*/*',
    //             'Content-Type': 'application/json',
    //             'X-Requested-With': 'XMLHttpRequest'
    //         }
    //     })

    //     return addresses.map(address =>
    //         progressList.find((progress) => progress.address === address)
    //     )
    // })

    async getBalance(addresses) {
        // return this.progressLoader.load(addresses)

        const data = await this.get(`address/${ addresses }/balances_v2/?&key=${ process.env.COVALENTHQ_SECRET }`, undefined, {
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Access-Control-Allow-Headers': 'X-Requested-With'
            }
        })

        return data
    }

}