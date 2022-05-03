import { apiResolver } from "next/dist/server/api-utils";

import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const user = this.usersRepository.findById(user_id);

    if (!user) {
      throw new Error("user not exist");
    }
    if (user.admin === true) {
      return this.usersRepository.list();
    }
    throw new Error("user not is admin");
  }
}

export { ListAllUsersUseCase };
