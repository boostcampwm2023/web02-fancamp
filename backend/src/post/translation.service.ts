import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CommentTranslation,
  PostTranslation,
} from './entities/translation.entity';
import { AvailableLanguage, translateText } from 'src/utils/translate';

interface CreatePostTranslationInput {
  postId: number;
  content: string;
}

interface CreateCommentTranslationInput {
  commentId: number;
  content: string;
}

const availableLanguages: AvailableLanguage[] = ['ko', 'en', 'ja'];

@Injectable()
export class TranslationService {
  constructor(
    @InjectRepository(PostTranslation)
    private postTranslationRepository: Repository<PostTranslation>,
    @InjectRepository(CommentTranslation)
    private commentTranslationRepository: Repository<CommentTranslation>,
  ) {}

  async createPostTranslation({ postId, content }: CreatePostTranslationInput) {
    const translationPromises = availableLanguages.map((language) =>
      translateText(content, language),
    );
    const translationResults = await Promise.all(translationPromises);
    const savePromises = translationResults.map(({ message }) => {
      const { tarLangType, translatedText } = message.result;
      const translationEntity = this.postTranslationRepository.create({
        post: { postId },
        languageCode: tarLangType,
        content: translatedText,
      });
      this.postTranslationRepository.save(translationEntity);
    });
    await Promise.all(savePromises);
    const result = translationResults.map(({ message }) => {
      const { tarLangType, translatedText } = message.result;
      return {
        languageCode: tarLangType,
        content: translatedText,
      };
    });
    return result;
  }

  async createCommentTranslation({
    commentId,
    content,
  }: CreateCommentTranslationInput) {
    const translationPromises = availableLanguages.map((language) =>
      translateText(content, language),
    );
    const translationResults = await Promise.all(translationPromises);
    const savePromises = translationResults.map(({ message }) => {
      const { tarLangType, translatedText } = message.result;
      const translationEntity = this.commentTranslationRepository.create({
        comment: { commentId },
        languageCode: tarLangType,
        content: translatedText,
      });
      this.commentTranslationRepository.save(translationEntity);
    });
    await Promise.all(savePromises);
    const result = translationResults.map(({ message }) => {
      const { tarLangType, translatedText } = message.result;
      return {
        languageCode: tarLangType,
        content: translatedText,
      };
    });
    return result;
  }
}
