import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Component({
  selector: 'app-my-reports',
  templateUrl: './my-reports.component.html',
  styleUrls: ['./my-reports.component.scss']
})
export class MyReportsComponent implements OnInit {

  constructor(
    public db: AngularFireDatabase
  ) { }

  onBtnClk(): void {
    console.log('button clicked');
    //this.listRef = this.db.list('/test');

    // online array maker https://codepen.io/jtfm/pen/apxJXG
    // online csv to array https://www.convertsimple.com/convert-csv-to-javascript-array/
    let arr = [
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Akan"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "American Sign Language"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Amharic"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Arabic"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Assamese"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Awadhi"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Azerbaijani"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Balochi"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Belarusian"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Bengali"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Bhojpuri"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Burmese"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Cebuano"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Chewa"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Chhattisgarhi"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Chittagonian"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Communication"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Czech"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Deccan"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Dhundhari"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Dutch"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Eastern Min"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "English"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "French"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Fula"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Gan"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "German"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Greek"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Gujarati"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Haitian Creole"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Hakka"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Haryanvi"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Hausa"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Hiligaynon/Ilonggo"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Hindi"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Hmong"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Hungarian"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Igbo"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Ilocano"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Italian"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Japanese"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Javanese"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Jin"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Kannada"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Kazakh"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Khmer"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Kinyarwanda"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Kirundi"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Konkani"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Korean"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Kurdish"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Languages"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Latin"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Madurese"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Magahi"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Maithili"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Malagasy"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Malay"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Malayalam"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Mandarin"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Marathi"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Marwari"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Mossi"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Nepali"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Northern Min"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Odia"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Oromo"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Pashto"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Persian"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Polish"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Portuguese"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Punjabi"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Quechua"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Romanian"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Russian"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Saraiki"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Serbo-Croatian"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Shona"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Sindhi"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Sinhalese"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Somali"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Southern Min"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Spanish"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Sundanese"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Swedish"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Sylheti"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Tagalog"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Tamil"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Telugu"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Thai"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Turkish"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Turkmen"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Ukrainian"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Urdu"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Uyghur"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Uzbek"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Vietnamese"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Wu"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Xhosa"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Xiang"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Yoruba"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Yue"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Zhuang"
      },
      {
        "category": "-N4Oe33cVOKYtEtXuYLd",
        "name": "Zulu"
      }
    ];

    for (var val of arr) {
      console.log(val);
      this.db.list('/skillcatalog/skills').push(val);
    }

  }

  ngOnInit(): void {
  }

}
