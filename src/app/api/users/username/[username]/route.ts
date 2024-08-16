import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getUserDataSelect } from "@/lib/types";

export async function GET(req: Request, { params: { username } }: { params: { username: string } }) {

   
    try {
      const { user: loggedInUser } = await validateRequest();
  
      if (!loggedInUser) {
        return Response.json({ error: "Não autorizado" }, { status: 401 });
      }
  
      const user = await prisma.user.findFirst({
        where: {
          username: {
            equals: username,
            mode: "insensitive",
          },
        },
        select: getUserDataSelect(loggedInUser.id),
      });
  
      if (!user) {
        return Response.json({ error: "Usuário não encontrado" }, { status: 404 });
      }
  
      return Response.json(user);
    } catch (error) {
      console.error(error);
      return Response.json({ error: "Erro no servidor" }, { status: 500 });
    }


}