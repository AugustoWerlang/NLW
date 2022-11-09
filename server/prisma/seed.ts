import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Jhon Doe",
      email: "jhon.doe@gmail.com",
      avatarUrl: "https://github.com/diego3g.png",
    }
  })

  const pool = await prisma.pool.create({
    data: {
      title: "Example Pool",
      code: "BOL123",
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id
        }
      }
    }
  })

  await prisma.game.create({
    data: {
      date: "2022-11-24T12:00:00.777Z",
      firstTeamCountryCode: "BR",
      secondTeamCountryCode: "SE",
    }
  })

  await prisma.game.create({
    data: {
      date: "2022-11-26T12:00:00.777Z",
      firstTeamCountryCode: "AR",
      secondTeamCountryCode: "BR",

      guesses: {
        create: {
          firstTeamPoints: 1,
          secondTeamPoints: 2,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id
              }
            }
          }
        }
      }
    }
  })

}

main()