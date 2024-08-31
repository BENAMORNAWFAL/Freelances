import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { Product } from '../product.entity';

@Controller('restaurant')
export class ProductController {
  constructor(private readonly ProductService: ProductService) {}
  //ajouter resto
  @Post('addresto')
  async addproduit(@Body('resto') resto: string, @Body('card') card: string) {
    return this.ProductService.ajouter({
      resto,
      card,
    });
  }

  @Delete(':id')
  async deleteResto(@Param('id') id: number): Promise<void> {
    //handle the error if resto not found
    const resto: any = await this.ProductService.findOneResto({
      where: { id },
    });
    if (!resto) {
      throw new Error('resto not found');
    }
    return this.ProductService.deleteResto(resto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    console.log(typeof id);

    const Product = await this.ProductService.findOneResto({ where: { id } });
    if (!Product) {
      throw new Error('Product not found');
    } else {
      return Product;
    }
  }
  //update resto
  @Put(':id')
  async update(@Param('id') id: number, @Body() resto: any): Promise<Product> {
    return this.ProductService.update(id, resto);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return await this.ProductService.findAllResto();
  }

  @Post(':id')
  async addcateg(
    @Param('id') id: number,
    @Body('card') card: any,
  ): Promise<Product> {
    const product: any = await this.ProductService.findOneProduct({
      where: { id },
    });
    if (!product) {
      throw new Error('Product not found');
    }
    let categorieId = Object.keys(card)[0];
    let workflow = {
      [categorieId]: {
        rank: 1,
        type: 'categories',
        content: {},
        override: {},
      },
    };
    product.card.categories = { ...product.card.categories, ...card };
    product.card.workflow = { ...product.card.workflow, ...workflow };
    console.log({ '2': product.card.categories });
    console.log({ '3': product.card.workflow });

    return this.ProductService.save(product);
  }
  /// delete categ
  @Delete(':id')
  async deletecateg(@Param('id') id: number): Promise<void> {
    //handle the error if resto not found
    const items: any = await this.ProductService.findOneResto({
      where: { id },
    });
    if (!items) {
      throw new Error('resto not found');
    }
    items.card.categories.items = { ...items.card.categories.items };

    return this.ProductService.deleteResto(items);
  } 
  @Get('/getcategories')
  async findCategoriesByProductId(): Promise<Product[]> {

    return await this.ProductService.findCategoriesByProductId();
  }
      
      /// add items
  @Post('addItem/:id')
  async additems(@Param('id') id: number, @Body('card') card: any,@Body('idCategorie') idCategorie:string): Promise<Product> {
    const Product: any = await this.ProductService.findOneProduct({ where: { id } });
    if (!Product) {
      throw new Error('items not found');
    }
    console.log({idCategorie});
    console.log({card});

    Product.card.categories[idCategorie].items = [...Product.card.categories[idCategorie].items,Object.keys(card)[0]];
    Product.card.items = {...Product.card.items,...card};

    console.log("cc",Product.card.categories[idCategorie]);
 
    return this.ProductService.saveItems(Product);
  }

  /// delete categ
  @Delete(':id')
  async deleteitem(@Param('id') id: number): Promise<void> {
    //handle the error if resto not found
    const items: any = await this.ProductService.findOneResto({
      where: { id },
    });
    if (!items) {
      throw new Error('resto not found');
    }
    items.card.items = { ...items.card.items };

    return this.ProductService.deleteItem(items);
  }
}

