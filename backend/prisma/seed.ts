import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // 🔐 cria usuário padrão
  const password = await bcrypt.hash("123456", 10);

  const user = await prisma.user.upsert({
    where: { email: "seed@test.com" },
    update: {},
    create: {
      name: "Seed User",
      email: "seed@test.com",
      password,
    },
  });

  // 🎬 filmes
  const movies = [
    {
      title: "Inception",
      releaseDate: new Date("2010-07-16"),
      duration: 148,
      language: "EN",
      genres: "Sci-Fi,Action",
    },
    {
      title: "Interstellar",
      releaseDate: new Date("2014-11-07"),
      duration: 169,
      language: "EN",
      genres: "Sci-Fi,Drama",
    },
    {
      title: "The Dark Knight",
      releaseDate: new Date("2008-07-18"),
      duration: 152,
      language: "EN",
      genres: "Action,Crime",
    },
    {
      title: "Parasite",
      releaseDate: new Date("2019-05-30"),
      duration: 132,
      language: "KR",
      genres: "Drama,Thriller",
    },
    {
      title: "The Godfather",
      releaseDate: new Date("1972-03-24"),
      duration: 175,
      language: "EN",
      genres: "Crime,Drama",
    },
    {
      title: "Avengers: Endgame",
      releaseDate: new Date("2019-04-26"),
      duration: 181,
      language: "EN",
      genres: "Action,Sci-Fi",
    },
    {
      title: "Joker",
      releaseDate: new Date("2019-10-04"),
      duration: 122,
      language: "EN",
      genres: "Drama,Crime",
    },
    {
      title: "Titanic",
      releaseDate: new Date("1997-12-19"),
      duration: 195,
      language: "EN",
      genres: "Drama,Romance",
    },
    {
      title: "Gladiator",
      releaseDate: new Date("2000-05-05"),
      duration: 155,
      language: "EN",
      genres: "Action,Drama",
    },
    {
      title: "The Matrix",
      releaseDate: new Date("1999-03-31"),
      duration: 136,
      language: "EN",
      genres: "Sci-Fi,Action",
    },
    {
      title: "Forrest Gump",
      releaseDate: new Date("1994-07-06"),
      duration: 142,
      language: "EN",
      genres: "Drama,Romance",
    },
    {
      title: "The Lion King",
      releaseDate: new Date("1994-06-24"),
      duration: 88,
      language: "EN",
      genres: "Animation,Adventure",
    },
    {
      title: "Spirited Away",
      releaseDate: new Date("2001-07-20"),
      duration: 125,
      language: "JP",
      genres: "Animation,Fantasy",
    },
    {
      title: "Pulp Fiction",
      releaseDate: new Date("1994-10-14"),
      duration: 154,
      language: "EN",
      genres: "Crime,Drama",
    },
    {
      title: "Fight Club",
      releaseDate: new Date("1999-10-15"),
      duration: 139,
      language: "EN",
      genres: "Drama",
    },
  ];

  // 🧹 limpa antes (evita duplicação)
  await prisma.movie.deleteMany();

  // 🚀 cria tudo
  await prisma.movie.createMany({
    data: movies.map((movie) => ({
      ...movie,
      userId: user.id,
    })),
  });

  console.log("✅ Seed finalizado");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
