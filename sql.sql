CREATE TABLE word
(
  id serial NOT NULL,
  match text,
  rich text,
  CONSTRAINT word_pkey PRIMARY KEY (id)
)
