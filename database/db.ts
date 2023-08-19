import { Product, ProductImage, ProductTag } from "@prisma/client";

import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";

interface Database {
	product: Product;
	product_image: ProductImage;
	product_tag: ProductTag;
}

export const db = new Kysely<Database>({
	dialect: new PlanetScaleDialect({
		host: "aws.connect.psdb.cloud",
		username: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD,
	}),
});
