import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, MaxLength, IsUrl, ValidateIf, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class SendTextMessageDto {
  @ApiProperty({
    description: 'WhatsApp chat ID (phone@c.us for individual, groupId@g.us for groups)',
    example: '628123456789@c.us',
  })
  @IsString()
  @IsNotEmpty()
  chatId: string;

  @ApiProperty({
    description: 'Text message content',
    example: 'Hello from OpenWA!',
    maxLength: 4096,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(4096)
  text: string;
}

export class SendMediaMessageDto {
  @ApiProperty({
    description: 'WhatsApp chat ID',
    example: '628123456789@c.us',
  })
  @IsString()
  @IsNotEmpty()
  chatId: string;

  @ApiPropertyOptional({
    description: 'Media URL (http/https)',
    example: 'https://example.com/image.jpg',
  })
  @IsOptional()
  @IsUrl()
  @ValidateIf((o: SendMediaMessageDto) => !o.base64)
  url?: string;

  @ApiPropertyOptional({
    description: 'Base64 encoded media data',
  })
  @IsOptional()
  @IsString()
  @ValidateIf((o: SendMediaMessageDto) => !o.url)
  base64?: string;

  @ApiPropertyOptional({
    description: 'Media MIME type (required when using base64)',
    example: 'image/jpeg',
  })
  @IsOptional()
  @IsString()
  mimetype?: string;

  @ApiPropertyOptional({
    description: 'Filename for the media',
    example: 'image.jpg',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  filename?: string;

  @ApiPropertyOptional({
    description: 'Caption for the media',
    example: 'Check out this image!',
    maxLength: 1024,
  })
  @IsOptional()
  @IsString()
  @MaxLength(1024)
  caption?: string;
}

export class ListRowDto {
  @ApiProperty({ example: 'item_1' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'Jollof Rice' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ example: '₦2,500' })
  @IsOptional()
  @IsString()
  description?: string;
}

export class ListSectionDto {
  @ApiProperty({ example: 'Food Items' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: [ListRowDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ListRowDto)
  rows: ListRowDto[];
}

export class SendListDto {
  @ApiProperty({ description: 'WhatsApp chat ID', example: '628123456789@c.us' })
  @IsString()
  @IsNotEmpty()
  chatId: string;

  @ApiProperty({ description: 'Body text shown above the list button', example: 'How may I assist you today?' })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty({ description: 'Label on the list open button', example: 'Select' })
  @IsString()
  @IsNotEmpty()
  buttonText: string;

  @ApiProperty({ type: [ListSectionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ListSectionDto)
  sections: ListSectionDto[];

  @ApiPropertyOptional({ example: 'Restaurant Menu' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'Tap Select to choose an option' })
  @IsOptional()
  @IsString()
  footer?: string;
}

export class SendPollDto {
  @ApiProperty({ description: 'WhatsApp chat ID', example: '628123456789@c.us' })
  @IsString()
  @IsNotEmpty()
  chatId: string;

  @ApiProperty({ description: 'Poll question / title', example: 'Choose your meal' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Poll options (2-12 tappable choices)',
    example: ['Jollof Rice - ₦2,500', 'Fried Rice - ₦2,000', 'Suya Platter - ₦3,500'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  options: string[];

  @ApiPropertyOptional({ description: 'Allow selecting more than one option', example: false })
  @IsOptional()
  allowMultipleAnswers?: boolean;
}

export class MessageResponseDto {
  @ApiProperty({ example: 'true_628123456789@c.us_3EB0123456789' })
  messageId: string;

  @ApiProperty({ example: 1706868000 })
  timestamp: number;
}
