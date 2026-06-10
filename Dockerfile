from node 
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY src src
COPY prisma prisma


RUN npm install 
RUN npx prisma generate
ENTRYPOINT [ "node","src/index.js" ]