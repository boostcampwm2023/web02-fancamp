import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { CreateUserAuthDto } from 'src/auth/dto/create-auth.dto';
import { ImageService } from 'src/image/image.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly imageService: ImageService,
  ) {}

  findUserByUserId(userId: number): Promise<User> {
    return this.userRepository.findUserByUserId(userId);
  }

  findUserByPublicId(publicId: string) {
    return this.userRepository.findUserByPublicId(publicId);
  }

  async get(publicId: string) {
    const { email, isMaster, chatName, profileImage } =
      await this.userRepository.findUserByPublicId(publicId);
    return { publicId, email, isMaster, chatName, profileImage };
  }

  async update(
    file: Express.Multer.File,
    publicId: string,
    updateUserDto: UpdateUserDto,
  ) {
    const user = await this.findUserByPublicId(publicId);
    const fileName = `${user.publicId}`;
    if (file) {
      const fileUrl = await this.imageService.uploadFile(file, fileName, -1);
      user.profileImage = fileUrl;
    }
    if (updateUserDto.chatName) {
      user.chatName = updateUserDto.chatName;
    }
    await this.userRepository.update(user);
    return {
      email: user.email,
      publicId: user.publicId,
      isMaster: user.isMaster,
      chatName: user.chatName,
      profileImage: user.profileImage,
    };
  }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
