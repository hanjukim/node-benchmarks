const { Suite } = require('benchmark');
const suite = new Suite('.replace() vs. .split().join() large text', { minTime: 10000 });

const mystring = 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non velit et ipsum vehicula condimentum ut ac ex. Donec molestie, odio aliquam eleifend placerat, leo sapien pulvinar nibh, a pulvinar diam nunc vel felis. Aliquam at justo sed magna lacinia elementum. Nulla sodales risus justo, et sollicitudin nunc dignissim sit amet. Sed ut tortor eget odio eleifend fringilla at id sem. Sed sed faucibus neque, id venenatis est. Sed placerat dui sit amet ligula laoreet vehicula. Proin est nisl, tempor quis lorem et, tristique congue risus. Aenean fringilla vulputate purus. In malesuada tempus nulla, ac ultricies lacus venenatis ut. Nulla condimentum, orci et sagittis volutpat, arcu risus finibus justo, ac semper diam lacus ac elit.\n\nSuspendisse potenti. Phasellus pulvinar lacinia orci ut mollis. In vitae efficitur arcu. Maecenas dignissim elit eget bibendum blandit. Donec tempus nisi in ante dictum auctor. Ut lobortis nibh at tortor interdum, ac sollicitudin neque vestibulum. Curabitur nisi lectus, hendrerit eget aliquet eu, hendrerit eu lacus. Sed ullamcorper erat at eros venenatis porta.\n\nVivamus sapien sapien, tincidunt et eros vitae, accumsan ultrices turpis. Ut auctor commodo nisi et gravida. Nam nec gravida dolor, id convallis eros. Phasellus efficitur turpis ligula, vel vestibulum lacus ultrices vel. Morbi risus lacus, lacinia sed ultrices vehicula, finibus sit amet nibh. Vivamus eu augue ante. Nullam pretium nibh vitae dignissim tempor. Ut finibus nisl ac porta laoreet. Cras quis libero tortor. Vivamus non felis blandit, fermentum diam ac, dignissim metus. Nunc sodales felis vel nibh dignissim, et tincidunt mauris elementum. In hac habitasse platea dictumst. Sed scelerisque porta felis, eu gravida velit efficitur at.\n\nIn hac habitasse platea dictumst. Maecenas commodo, sapien ac accumsan ultrices, eros augue gravida sapien, quis convallis massa mi facilisis sapien. Suspendisse accumsan elit volutpat, placerat enim non, ornare lorem. Sed iaculis, tortor varius feugiat tincidunt, purus turpis auctor libero, ut tincidunt justo nisl non erat. Ut ipsum purus, venenatis ac nulla id, aliquet faucibus dui. Quisque placerat, lectus vitae interdum finibus, quam neque commodo velit, efficitur fringilla mi leo vitae tortor. Curabitur ac eros ac nulla ornare aliquam eu a risus. Nulla scelerisque nisi et arcu maximus bibendum. Quisque sollicitudin nibh vel felis commodo scelerisque. Nullam in nulla non velit rhoncus vestibulum. Vestibulum id eros sollicitudin, tincidunt dui ac, sollicitudin neque. Donec eget dignissim ex. Aenean dapibus turpis ut erat fermentum efficitur. Integer at ex augue.\n\nSed ullamcorper felis et tortor suscipit fermentum. Duis posuere nulla libero, vel dapibus nisi consectetur a. Phasellus id feugiat mi. Duis convallis ullamcorper ante. Sed viverra, mauris vitae maximus vehicula, turpis lacus venenatis mi, eu faucibus orci magna nec est. Aliquam est lectus, lobortis a pretium eu, pharetra tincidunt dui. Sed eget aliquam ipsum, eleifend laoreet justo. Phasellus sit amet luctus augue. Etiam vulputate, justo at interdum accumsan, nibh ex gravida ligula, nec tristique neque ipsum ut tortor. Curabitur aliquam malesuada tortor id sollicitudin. Sed id ante viverra, suscipit erat quis, sagittis nibh. Vestibulum sed diam sit amet leo sollicitudin faucibus. Quisque at sapien finibus, sodales lacus a, auctor nisi. Donec id lectus sapien. Duis facilisis rutrum purus, ut dictum libero viverra eget. Nulla facilisi.';

function replace_long(oldS,newS,fullS) {
  var fullS = fullS != null ? fullS.toString() : '',
    i = 0;

  while (i < fullS.length) {
    if (fullS.substring && fullS.substring(i,i+oldS.length) == oldS) {
      fullS = (
        fullS.substring(0,i) +
        newS +
        fullS.substring(i+oldS.length,fullS.length)
      );
      i += newS.length;
    } else {
      i++;
    }
  }
  return fullS;
}

suite
  .add('replace literal RegExp', () => {
    result = mystring.replace(/ /g, '–');
  })
  .add('split.join literal RegExp', () => {
    result = mystring.split(/ /g).join('–');
  })
  .add('split.join string', () => {
    result = mystring.split(' ').join('–');
  })
  .add('replace constructed RegExp', () => {
    result = mystring.replace(new RegExp(' ', 'g'), '–');
  })
  .add('split.join constructed RegExp', () => {
    result = mystring.split(new RegExp(' ', 'g')).join('–');
  })
  .add('replace stored literal RegExp', () => {
    var re = / /g; 
    result = mystring.replace(re, '–');
  })
  .add('replace literal multiline RegExp', () => {
    result = mystring.replace(/ /gm, '–');
  })
  .add('replace stored constructed RegExp', () => {
    var re = new RegExp(' ', 'g'); 
    result = mystring.replace(re, '–');
  })
  .add('substring loop', () => {
    result = replace_long(' ', '-', mystring);
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  }).run();
