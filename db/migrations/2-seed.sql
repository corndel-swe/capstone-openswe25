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
('luna_ray','Luna Raymond','luna.ray@example.com','Dk!9v#2sWqP1'),
('marcota','Marco Tavares','marco.tavares@example.com','Zm4$Lp8!xV2q'),
('abby_cole','Abigail Cole','abby.cole@example.com','A7!bR9xq#eF2'),
('soren.k','Soren Kline','soren.k@example.com','Xf3@N8pL7zQw'),
('nina_park','Nina Park','nina.park@example.com','Pz!6Rm2YcV8d'),
('jax_holt','Jaxon Holt','jax.holt@example.com','Ht9#Gv2!sK5m'),
('mari_soto','Marisol Soto','mari.soto@example.com','Qr4$Tn7bWp1L');

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