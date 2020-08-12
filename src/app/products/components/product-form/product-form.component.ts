import { Component, OnInit } from '@angular/core'
import { ProductData } from '../../models/product'
import { ProductService } from '../../service/product.service'
import { ActivatedRoute } from '@angular/router'
import { FormGroup } from '@angular/forms'
import { FormlyFieldConfig } from '@ngx-formly/core'

@Component({
	selector: 'app-product-form',
	templateUrl: './product-form.component.html',
	styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
	public id: string = ''
	public productItem: ProductData = null
	public productProps: string[] = []

	public form = new FormGroup({})
	public model = {}
	public fields: FormlyFieldConfig[] = [
		{
			key: 'name',
			type: 'input',
			templateOptions: {
				label: 'Name',
				placeholder: 'Enter name',
				required: true,
			},
		},
		{
			key: 'description',
			type: 'input',
			templateOptions: {
				type: 'text',
				label: 'Description',
				placeholder: 'Enter description',
				required: true,
			},
		},
		{
			key: 'price',
			type: 'input',
			templateOptions: {
				type: 'number',
				label: 'Price',
				placeholder: 'Enter price',
				required: true,
			},
		},
		{
			key: 'quantity',
			type: 'input',
			templateOptions: {
				typpe: 'number',
				label: 'Quantity',
				placeholder: 'Enter quantity',
				required: true,
			},
		},
		{
			key: 'backorderLimit',
			type: 'input',
			templateOptions: {
				typpe: 'number',
				label: 'Backorder limit',
				placeholder: 'Enter backorderLimit',
				required: true,
			},
		},
		{
			key: 'backordered',
			type: 'checkbox',
			templateOptions: {
				label: 'Backordered',
				placeholder: 'Enter backordered',
				required: true,
			},
		},
	]

	constructor(private product: ProductService, private route: ActivatedRoute) {
		this.route.params.subscribe((params) => {
			this.id = params?.id
		})
	}

	public ngOnInit(): void {
		this.getProduct()
	}

	private getProduct() {
		if (this.id !== 'new') {
			this.product.getProductById(this.id).then((product) => {
				this.productItem = product
			})
		} else {
			this.productItem = new ProductData()
		}
	}

	public onSubmit(data) {
		console.log(data)
	}
}
