-- Seed Post 
INSERT INTO POST (title, content, user_id, created_at)
VALUES
('My Weekend In Paris!', 'Me and my family spent a lovely weekend in Paris. Just don''t check my luggage for any Jewels!', 3, '2025-11-14T09:17:15.123Z'),
('Cigarettes and Alcohol', 'Can''t believe we actually got Oasis tickets #NotLookingBackInAnger', 1, '2024-11-14T09:17:15.123Z'),
('Birthday bash', 'Thanks again to everyone for coming to my birthday party', 2, '2022-11-14T09:17:15.123Z'),
('Colin & Call of Duty', 'Spent another weekend in. Played the new COD and bought a Colin the Caterpillar - I think I''ve peaked.', 5, '2023-11-14T09:17:15.123Z');


INSERT INTO CATEGORY (name)
VALUES
('Travel'),
('Sport'),
('Entertainment'),
('Technology'),
('Food'),
('Miscellaneous');

INSERT INTO POST_CATEGORY
VALUES
(1, 1),
(1, 6),
(2, 3),
(3, 3),
(3, 6),
(4, 3),
(4, 4);



INSERT INTO USER (username, fullname, email, password_hash)
VALUES
('luna_ray','Luna Raymond','luna.ray@example.com','$2a$10$/.d/7lCYPYf26CtzvhhJluabLG2G4R1YW2At7uT/lfG9F1t7npWB6'),
('marcota','Marco Tavares','marco.tavares@example.com','$2a$10$S3MrqfJ.cMkNmcgF/JheIu9tRE5DbfseC7OiAi7EIGE98lpufDN6m'),
('abby_cole','Abigail Cole','abby.cole@example.com','$2a$10$ZCn8J4.7BNEdBNKxlHKl2usp.mXD7gQl84ATc8GOwm4SC/BpwrPbS'),
('soren.k','Soren Kline','soren.k@example.com','$2a$10$L29g8fSF6Y1cQrUjVRf0weJ3OvUYdYcbBZbNzdcdFtIEDu.ZNv5za'),
('nina_park','Nina Park','nina.park@example.com','$2a$10$brfdznBjWgEV6.sOJ3jmLedjedfuxNIrwVu.0xh8J7Cul.ZoKHW4m'),
('jax_holt','Jaxon Holt','jax.holt@example.com','$2a$10$XJLfNy9aYfQgE.cbld2ak.aJ47jhIR2lzyWhmAEn66gmIR8uR/fyK'),
('mari_soto','Marisol Soto','mari.soto@example.com','$2a$10$Xsjk5lrN.VXe0FGUTvpHlOvPozWkTXBCK6z7sr5tkizCibjM21zjS');

INSERT INTO COMMENT (post_id, user_id, content)
VALUES 
(1, 2, 'Love this post! Really helped me understand the topic better.'),
(1, 5, 'Great insights — can you share the source you used?'),
(2, 1, 'I totally agree with your point about staying consistent.'),
(2, 3, 'Nice write-up, I learned something new today!'),
(3, 4, 'This could use a few more examples, but still solid.'),
(3, 6, 'Wow, didn''t think of it that way. Thanks for sharing!'),
(4, 2, 'Could you elaborate on the last paragraph? It was interesting.'),
(4, 1, 'Loved reading this! The visuals really add to the explanation.');



INSERT INTO POST_LIKE
VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(2, 5),
(2, 6),
(3, 1),
(3, 2),
(3, 3),
(3, 4),
(3, 5),
(3, 6),
(4, 1),
(4, 2),
(4, 3),
(4, 4),
(4, 5),
(4, 6);