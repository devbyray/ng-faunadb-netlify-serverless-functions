export class Product {
	ref: any = null
	ts: number = 0
	data: ProductData = null

	constructor(data) {
		this.ref = data.ref
		this.ts = data.ts
		const product = { ...data.data }
		product.id = data.ref['@ref'].id
		this.data = new ProductData(product)
	}
}

export class ProductData {
	name: string = ''
	description: string = ''
	price: number = 0
	quantity: number = 0
	storehouse: any = null
	backorderLimit: number = 0
	backordered = false
	image?: string = ''
	id: string = ''

	constructor(data?) {
		this.id = data?.id ?? ''
		this.name = data?.name ?? ''
		this.description = data?.description ?? ''
		this.price = data?.price ?? ''
		this.quantity = data?.quantity ?? ''
		this.storehouse = data?.storehouse ?? ''
		this.backorderLimit = data?.backorderLimit ?? ''
		this.backordered = data?.backordered ?? ''
		this.image = data?.image || ''
	}
}
