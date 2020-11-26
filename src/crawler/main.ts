import { writeFileSync } from 'fs';
import { resolve } from 'path';
import Crawler from 'crawler'

const thing = [];

const c = new Crawler({
  maxConnections: 10,
  // This will be called for each crawled page
  callback: function (error, res, done) {
    if (error) {
      console.log(error);
      return;
    }

    var $ = res.$;

    $(".article-table > tbody > tr").each((ndx, tr) => {
      const $tds = $(tr).find('td');
      thing.push({
        'image': $tds.eq(0).find('.image').prop('href'),
        'name': $tds.eq(1).text().trim(),
        'stats': $tds.eq(2).text().trim()
      });
    })

    writeFileSync(resolve(__dirname, '../../', 'public/data', 'relics.json'), JSON.stringify(thing, null, '\t'), { encoding: 'utf8' });
    console.log("Done.");
    done();
  }
});

// Queue just one URL, with default callback
c.queue('https://herosiege.fandom.com/wiki/Relics');
