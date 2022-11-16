import { defineStore } from 'pinia'
import apollo from '~/apollo/redct'
import { SHORTEN_MUTATION } from '~/graphql'

export const useClipboardStore = defineStore('clipboard', {
    state: () => ({
        loading: false,
        copied: false,
        link: ''
    }),

    actions: {
        async get(link: string) {
            
            try {

                apollo.mutate({
                    mutation: SHORTEN_MUTATION,
                    variables: {
                        input: {
                            longUrl: link
                        }
                    }
                })
                    .then(({ data: { shorten } }) => {
                        this.link = shorten?.url
                    })
                    
            } catch (error) {
                console.log(error)
            }
        },
        async copy(link: string) {
            this.copied = true

            this.link = link

            // try {

            //     this.loading = true

            //     apollo.mutate({
            //         mutation: SHORTEN_MUTATION,
            //         variables: {
            //             input: {
            //                 longUrl: link
            //             }
            //         }
            //     })
            //         .then(({ data: { shorten } }) => {
            //             this.link = shorten?.url
                
            //             this.loading = false
            //         })
                    
            // } catch (error) {
            //     console.log(error)
            // }

            // this.loading = false

            setTimeout(() => this.copied = false, 2000)
            
        }
    }
})