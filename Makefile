build:
	docker build -t next-apollo .

run:
	docker run -i -d -p 3000:3000 next-apollo