
'use server';

/**
 * @fileOverview A dynamic marketing copy generation AI agent.
 *
 * - generateMarketingCopy - A function that generates marketing copy based on the type of business.
 * - GenerateMarketingCopyInput - The input type for the generateMarketingCopy function.
 * - GenerateMarketingCopyOutput - The return type for the generateMarketingCopy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMarketingCopyInputSchema = z.object({
  businessType: z
    .string()
    .describe('Jenis usaha, contoh: Restoran, Toko Fashion, dll.'),
  productService: z
    .string()
    .describe('Produk atau layanan spesifik yang ingin dipromosikan. Contoh: "Kopi Susu Gula Aren" atau "Diskon cuci rambut".'),
  targetAudience: z
    .string()
    .describe('Target audiens yang dituju. Contoh: "Mahasiswa", "Keluarga Muda", "Pekerja kantoran".'),
  tone: z
    .enum(['santai', 'profesional', 'lucu', 'bersemangat'])
    .describe('Gaya bahasa yang diinginkan untuk copy.'),
});
export type GenerateMarketingCopyInput = z.infer<typeof GenerateMarketingCopyInputSchema>;

const GenerateMarketingCopyOutputSchema = z.object({
  copies: z
    .array(
      z.object({
        headline: z.string().describe('Judul atau headline yang menarik.'),
        body: z.string().describe('Isi pesan promosi.'),
      })
    )
    .describe('Array berisi 3 alternatif marketing copy yang dihasilkan.'),
});
export type GenerateMarketingCopyOutput = z.infer<typeof GenerateMarketingCopyOutputSchema>;

export async function generateMarketingCopy(input: GenerateMarketingCopyInput): Promise<GenerateMarketingCopyOutput> {
  return generateMarketingCopyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMarketingCopyPrompt',
  input: {schema: GenerateMarketingCopyInputSchema},
  output: {schema: GenerateMarketingCopyOutputSchema},
  prompt: `Kamu adalah seorang copywriter handal dan kreatif yang jago membuat kalimat promosi yang menjual dengan gaya bahasa khas Indonesia.

Tugasmu adalah membuat 3 (tiga) alternatif materi promosi yang berbeda untuk klien.

Berikut detailnya:
- Jenis Bisnis: {{{businessType}}}
- Produk/Layanan yang Dipromosikan: {{{productService}}}
- Target Audiens: {{{targetAudience}}}
- Gaya Bahasa yang Diinginkan: {{{tone}}}

Setiap alternatif harus memiliki:
1.  **Headline:** Judul yang singkat, nge-hook, dan bikin penasaran. Maksimal 6 kata.
2.  **Body:** Isi pesan yang persuasif, jelas, dan punya call-to-action yang kuat.

Pastikan hasil akhir sesuai dengan format output JSON yang diminta. Buatlah copy yang benar-benar terasa natural, menjual, dan tidak kaku!`,
});

const generateMarketingCopyFlow = ai.defineFlow(
  {
    name: 'generateMarketingCopyFlow',
    inputSchema: GenerateMarketingCopyInputSchema,
    outputSchema: GenerateMarketingCopyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
