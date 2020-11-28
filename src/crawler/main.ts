import { writeFileSync } from 'fs';
import { resolve } from 'path';
// @ts-ignore
import Crawler from 'crawler';

const thing: any = [];

const c = new Crawler({
  maxConnections: 10,
  // This will be called for each crawled page
  callback: function (error: any, res: any, done: any) {
    if (error) {
      console.log(error);
      return;
    }

    var $ = res.$;

    $('.article-table > tbody > tr').each((ndx: any, tr: any) => {
      const $tds = $(tr).find('td');
      const $h3 = $(tr).closest('.article-table').prev().prev();

      thing.push({
        image: $tds.eq(0).find('.image').prop('href').split('/revision/')[0],
        name: $tds.eq(1).text().trim(),
        category: $h3.text(),
        stats: $tds.eq(2).text().trim(),
      });
    });

    writeFileSync(resolve(__dirname, '../../', 'public/data', 'relics.json'), JSON.stringify(thing, null, '\t'), { encoding: 'utf8' });
    console.log('Done.');
    done();
  },
});

// Queue just one URL, with default callback
c.queue('https://herosiege.fandom.com/wiki/Relics');
