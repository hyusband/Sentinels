FROM denoland/deno:alpine-1.42.0

WORKDIR /app

COPY deps.ts .
RUN deno cache deps.ts

COPY . .

RUN deno cache src/mod.ts

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "src/mod.ts"]
