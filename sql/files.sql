CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL
);


CREATE OR REPLACE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    image TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL
);


CREATE TABLE orders (
    order_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    total_price DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);


INSERT INTO products (name, image, price) VALUES
('5 piece chicken', 'https://res.cloudinary.com/dftiz9e4h/image/upload/v1743010502/5_piece_chicken_b8mtec.jpg', 1230.00),
('Chips Masala', 'https://res.cloudinary.com/dftiz9e4h/image/upload/v1743010506/200g_chips_masala_kqla4e.jpg', 200.00),
('Egg Fried Burger', 'https://res.cloudinary.com/dftiz9e4h/image/upload/v1743010506/egg_fried_burger_hlb6gs.jpg', 150.00),
('French fries', 'https://res.cloudinary.com/dftiz9e4h/image/upload/v1743010506/frozen_french_fries_csws7v.jpg', 430.00),
('In & Out burger', 'https://res.cloudinary.com/dftiz9e4h/image/upload/v1743010505/in_out_burger_wqtf4p.jpg', 230.00),
('200g Bhajia', 'https://res.cloudinary.com/dftiz9e4h/image/upload/v1743010501/200g_Bhajia_jvslkz.jpg', 230.00),
('Beef stew with rice', 'https://res.cloudinary.com/dftiz9e4h/image/upload/v1743010502/Beef_stew_with_rice_mb393p.jpg', 199.00),
('Chapo beef', 'https://res.cloudinary.com/dftiz9e4h/image/upload/v1743010502/chapo_beef_jhyzx7.jpg', 120.00),
('Chips mwitu', 'https://res.cloudinary.com/dftiz9e4h/image/upload/v1743010502/Chips_mwitu_cauxpd.jpg', 199.00),
('Pilau beef', 'https://res.cloudinary.com/dftiz9e4h/image/upload/v1743010505/pilau_beef_aq7tlu.jpg', 130.00),
('Matoke fries', 'https://res.cloudinary.com/dftiz9e4h/image/upload/v1743010505/matoke_fries_jf5kla.jpg', 149.00),
('Scrambled eggs & beef over rice', 'https://res.cloudinary.com/dftiz9e4h/image/upload/v1743010505/scrambled_eggs_and_beef_over_rice_hjtzsj.jpg', 299.00),
('Kachumbari salad', 'https://res.cloudinary.com/dftiz9e4h/image/upload/v1743010505/kachumbari_salad_wob4cx.jpg', 189.00),
('Garlic Masala', 'https://res.cloudinary.com/dftiz9e4h/image/upload/v1743010503/Garlic_masala_n6kwd6.jpg', 799.00),
('Fish and fries', 'https://res.cloudinary.com/dftiz9e4h/image/upload/v1743010503/fish_and_fries_mqovbw.jpg', 299.00),
('Fried chicken', 'https://res.cloudinary.com/dftiz9e4h/image/upload/v1743010503/Fried_chicken_nyupa6.jpg', 999.00),
('Frozen french fries', 'https://res.cloudinary.com/dftiz9e4h/image/upload/v1743010502/Crispy_french_fries_errezq.jpg', 399.00),
('Ugali beef', 'https://res.cloudinary.com/dftiz9e4h/image/upload/v1743010506/ugali_beef_eakd4r.jpg', 120.00);
