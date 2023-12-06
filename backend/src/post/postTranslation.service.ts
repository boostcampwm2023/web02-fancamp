import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostTranslation } from './entities/postTranslation.entity';
import fetch from 'node-fetch';

type AvailableLanguage = 'ko' | 'en' | 'ja';
const availableLanguages: AvailableLanguage[] = ['ko', 'en', 'ja'];

interface TranslateResult {
  message: {
    result: {
      srcLangType: string;
      tarLangType: string;
      translatedText: string;
    };
  };
}

interface CreatePostTranslationInput {
  postId: number;
  content: string;
}

@Injectable()
export class PostTranslationService {
  constructor(
    @InjectRepository(PostTranslation)
    private postTranslationRepository: Repository<PostTranslation>,
  ) {}

  private logger = new Logger('PostTranslationService');

  async translateText(text: string, targetLanguage: AvailableLanguage) {
    const textData = {
      text,
      target: targetLanguage,
      source: 'auto',
    };
    return fetch(process.env.PAPAGO_ENDPOINT, {
      method: 'POST',
      headers: {
        'X-NCP-APIGW-API-KEY-ID': process.env.PAPAGO_CLIENT_ID,
        'X-NCP-APIGW-API-KEY': process.env.PAPAGO_SECRET,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(textData),
    })
      .then((res) => {
        if (!res.ok) {
          return {
            message: {
              result: {
                srcLangType: targetLanguage,
                tarLangType: targetLanguage,
                translatedText: text,
              },
            },
          };
        }
        return res.json();
      })
      .then((data) => data.message.result);
  }

  async createPostTranslation({ postId, content }: CreatePostTranslationInput) {
    const translationPromises = availableLanguages.map((language) =>
      this.translateText(content, language),
    );
    const translationResults = await Promise.all(translationPromises);
    const savePromises = translationResults.map((result) => {
      const translationEntity = this.postTranslationRepository.create({
        post: { postId },
        languageCode: result.tarLangType,
        content: result.translatedText,
      });
      return this.postTranslationRepository.save(translationEntity);
    });
    return await Promise.all(savePromises);
  }
}
