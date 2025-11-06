// Bible Books Seed Data gemäß Masterplan

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedBibleBooks() {
  const books = [
    // Altes Testament
    { name: '1. Mose', abbreviation: '1Mo', order: 1, description: 'Genesis - Die Schöpfung' },
    { name: '2. Mose', abbreviation: '2Mo', order: 2, description: 'Exodus - Der Auszug aus Ägypten' },
    { name: '3. Mose', abbreviation: '3Mo', order: 3, description: 'Levitikus - Das Gesetz' },
    { name: '4. Mose', abbreviation: '4Mo', order: 4, description: 'Numeri - Die Wüstenwanderung' },
    { name: '5. Mose', abbreviation: '5Mo', order: 5, description: 'Deuteronomium - Das Gesetz' },
    { name: 'Josua', abbreviation: 'Jos', order: 6, description: 'Eroberung des verheißenen Landes' },
    { name: 'Richter', abbreviation: 'Ri', order: 7, description: 'Die Zeit der Richter' },
    { name: 'Rut', abbreviation: 'Rut', order: 8, description: 'Die Geschichte von Rut' },
    { name: '1. Samuel', abbreviation: '1Sam', order: 9, description: 'Samuel und Saul' },
    { name: '2. Samuel', abbreviation: '2Sam', order: 10, description: 'David als König' },
    { name: '1. Könige', abbreviation: '1Kön', order: 11, description: 'Salomo und die geteilten Königreiche' },
    { name: '2. Könige', abbreviation: '2Kön', order: 12, description: 'Die Könige von Israel und Juda' },
    { name: '1. Chronik', abbreviation: '1Chr', order: 13, description: 'Geschichte Israels' },
    { name: '2. Chronik', abbreviation: '2Chr', order: 14, description: 'Geschichte Judas' },
    { name: 'Esra', abbreviation: 'Esr', order: 15, description: 'Rückkehr aus dem Exil' },
    { name: 'Nehemia', abbreviation: 'Neh', order: 16, description: 'Wiederaufbau Jerusalems' },
    { name: 'Esther', abbreviation: 'Est', order: 17, description: 'Die Geschichte von Esther' },
    { name: 'Hiob', abbreviation: 'Hi', order: 18, description: 'Das Leiden Hiobs' },
    { name: 'Psalmen', abbreviation: 'Ps', order: 19, description: 'Lieder und Gebete' },
    { name: 'Sprüche', abbreviation: 'Spr', order: 20, description: 'Weisheit Salomos' },
    { name: 'Prediger', abbreviation: 'Pred', order: 21, description: 'Kohelet' },
    { name: 'Hoheslied', abbreviation: 'Hl', order: 22, description: 'Das Lied der Lieder' },
    { name: 'Jesaja', abbreviation: 'Jes', order: 23, description: 'Der Prophet Jesaja' },
    { name: 'Jeremia', abbreviation: 'Jer', order: 24, description: 'Der Prophet Jeremia' },
    { name: 'Klagelieder', abbreviation: 'Klgl', order: 25, description: 'Die Klagelieder Jeremias' },
    { name: 'Hesekiel', abbreviation: 'Hes', order: 26, description: 'Der Prophet Hesekiel' },
    { name: 'Daniel', abbreviation: 'Dan', order: 27, description: 'Daniel in Babylon' },
    { name: 'Hosea', abbreviation: 'Hos', order: 28, description: 'Der Prophet Hosea' },
    { name: 'Joel', abbreviation: 'Joel', order: 29, description: 'Der Prophet Joel' },
    { name: 'Amos', abbreviation: 'Am', order: 30, description: 'Der Prophet Amos' },
    { name: 'Obadja', abbreviation: 'Ob', order: 31, description: 'Der Prophet Obadja' },
    { name: 'Jona', abbreviation: 'Jon', order: 32, description: 'Der Prophet Jona' },
    { name: 'Micha', abbreviation: 'Mi', order: 33, description: 'Der Prophet Micha' },
    { name: 'Nahum', abbreviation: 'Nah', order: 34, description: 'Der Prophet Nahum' },
    { name: 'Habakuk', abbreviation: 'Hab', order: 35, description: 'Der Prophet Habakuk' },
    { name: 'Zefanja', abbreviation: 'Zef', order: 36, description: 'Der Prophet Zefanja' },
    { name: 'Haggai', abbreviation: 'Hag', order: 37, description: 'Der Prophet Haggai' },
    { name: 'Sacharja', abbreviation: 'Sach', order: 38, description: 'Der Prophet Sacharja' },
    { name: 'Maleachi', abbreviation: 'Mal', order: 39, description: 'Der Prophet Maleachi' },
    
    // Neues Testament
    { name: 'Matthäus', abbreviation: 'Mt', order: 40, description: 'Das Evangelium nach Matthäus' },
    { name: 'Markus', abbreviation: 'Mk', order: 41, description: 'Das Evangelium nach Markus' },
    { name: 'Lukas', abbreviation: 'Lk', order: 42, description: 'Das Evangelium nach Lukas' },
    { name: 'Johannes', abbreviation: 'Joh', order: 43, description: 'Das Evangelium nach Johannes' },
    { name: 'Apostelgeschichte', abbreviation: 'Apg', order: 44, description: 'Die Taten der Apostel' },
    { name: 'Römer', abbreviation: 'Röm', order: 45, description: 'Der Brief des Paulus an die Römer' },
    { name: '1. Korinther', abbreviation: '1Kor', order: 46, description: 'Der erste Brief des Paulus an die Korinther' },
    { name: '2. Korinther', abbreviation: '2Kor', order: 47, description: 'Der zweite Brief des Paulus an die Korinther' },
    { name: 'Galater', abbreviation: 'Gal', order: 48, description: 'Der Brief des Paulus an die Galater' },
    { name: 'Epheser', abbreviation: 'Eph', order: 49, description: 'Der Brief des Paulus an die Epheser' },
    { name: 'Philipper', abbreviation: 'Phil', order: 50, description: 'Der Brief des Paulus an die Philipper' },
    { name: 'Kolosser', abbreviation: 'Kol', order: 51, description: 'Der Brief des Paulus an die Kolosser' },
    { name: '1. Thessalonicher', abbreviation: '1Thess', order: 52, description: 'Der erste Brief des Paulus an die Thessalonicher' },
    { name: '2. Thessalonicher', abbreviation: '2Thess', order: 53, description: 'Der zweite Brief des Paulus an die Thessalonicher' },
    { name: '1. Timotheus', abbreviation: '1Tim', order: 54, description: 'Der erste Brief des Paulus an Timotheus' },
    { name: '2. Timotheus', abbreviation: '2Tim', order: 55, description: 'Der zweite Brief des Paulus an Timotheus' },
    { name: 'Titus', abbreviation: 'Tit', order: 56, description: 'Der Brief des Paulus an Titus' },
    { name: 'Philemon', abbreviation: 'Phlm', order: 57, description: 'Der Brief des Paulus an Philemon' },
    { name: 'Hebräer', abbreviation: 'Hebr', order: 58, description: 'Der Brief an die Hebräer' },
    { name: 'Jakobus', abbreviation: 'Jak', order: 59, description: 'Der Brief des Jakobus' },
    { name: '1. Petrus', abbreviation: '1Pet', order: 60, description: 'Der erste Brief des Petrus' },
    { name: '2. Petrus', abbreviation: '2Pet', order: 61, description: 'Der zweite Brief des Petrus' },
    { name: '1. Johannes', abbreviation: '1Joh', order: 62, description: 'Der erste Brief des Johannes' },
    { name: '2. Johannes', abbreviation: '2Joh', order: 63, description: 'Der zweite Brief des Johannes' },
    { name: '3. Johannes', abbreviation: '3Joh', order: 64, description: 'Der dritte Brief des Johannes' },
    { name: 'Judas', abbreviation: 'Jud', order: 65, description: 'Der Brief des Judas' },
    { name: 'Offenbarung', abbreviation: 'Offb', order: 66, description: 'Die Offenbarung des Johannes' },
  ];

  for (const book of books) {
    await prisma.bibleBook.upsert({
      where: { abbreviation: book.abbreviation },
      update: {},
      create: book,
    });
  }

  console.log(`Seeded ${books.length} Bible books successfully`);
}

// Allow standalone execution
if (require.main === module) {
  seedBibleBooks()
    .catch((error) => {
      console.error(error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

