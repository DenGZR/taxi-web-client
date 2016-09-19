import React, { Component } from 'react'
import { Link } from 'react-router'

class PublicOffer extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {

  }

  render() {
    console.log("PublicOffer");
        return (
          <div className="container-fluid  public-offer-page">
            <main className="main-content">
              <section id="main-banner" className="main-banner page-block">
                <div className="bg-main-banner"></div>
                <div className="public-offer row">
                  <div className="col-xs-8 col-xs-offset-2">
                    <div className="wrap">
                      <h2 className="title">ПУБЛІЧНА ОФЕРТА</h2>
                      <p>
                        Цей документ є публічною офертою та публічним Договором  і згідно ст. 633, 641 та гл. 63 Цивільного кодексу України її умови однакові для всіх споживачів.
                      </p>
                      <p>
                        У відповідності з ч. 2 ст. 642 Цивільного кодексу України, звернення за наданням Послуги є акцептом даної оферти. Для того щоб укласти Трудовий договір, надалі за текстом – «Договір», фізична особа (надалі за текстом - «Виконавець») повинна здійснити акцепт, тобто надати свою згоду на укладання договору на умовах, викладених в оферті. Виконавець повинен повідомити свої персональні дані та надати їх для вільного використання компанією (надалі за текстом – «Роботодавець»), в такому разі Договір вважатиметься укладеним, а Роботодавець - тим, що прийняв на себе зобов’язання надавати послуги, що визначені в предметі Договору.
                      </p>
                      <h2 className="title">
                        Договір укладається у письмовій формі.
                      </h2>
                      <ol className="list">
                       <li>ТЕРМІНИ ТА ВИЗНАЧЕННЯ
                         <ol className="sub-list">
                            <li>«Виконавець» – фізична особа, яка за наявності транспортного засобу звертається до Інформаційного  Колл-Центру «COMBOTAXI» через програмний додаток «Combo Taxi Driver».</li>
                            <li>Інформаційні послуги – дії інформаційного Колл-центру, щодо забезпечення Виконавця інформаційними продуктами про замовлення Споживачів, програми “COMBOTAXI”, знижки на паливо та інше.</li>
                            <li>«Інформаційний  Колл-Центр»  (надалі – ІКЦ) – Роботодавець, що здійснює інформаційне забезпечення Виконавця з приводу наявних замовлень, запитуваних Виконавцем.</li>
                            <li>Запит – звернення Виконавця засобами зв’язку за отриманням відповідної інформації, надання якої є сферою діяльності ІКЦ згідно умов Договору.</li>
                          </ol>
                       </li>
                       <li>ПРЕДМЕТ ДОГОВОРУ
                         <ol className="sub-list">
                           <li>Роботавець зобов‘язується надавати Виконавцю інформаційні послуги на умовах та в порядку, передбачених цим Договором, а Виконавець зобов‘язується приймати надані послуги та надати оплату Роботодавцю за надання вказаних послуг, пов’язаних з передачею інформації Виконавцю.</li>
                           <li>Роботодавець та Виконавець співіснують на партнерських умовах взаємовигідного Договору.</li>
                         </ol>
                       </li>
                       <li>ПОРЯДОК НАДАННЯ ІНФОРМАЦІЙНИХ ПОСЛУГ
                          <ol className="sub-list">
                            <li>Послуга надається Виконавцю на підставі Договору, який укладається між Роботодавцем та Виконавцем шляхом вчинення Сторонами дій,  що свідчать про згоду дотримуватися оприлюднених Правил публічної оферти. Договір про надання послуг укладається шляхом акцепту Виконавцем дійсної публічної оферти, що містить всі істотні умови Договору.</li>
                            <li>Повним і беззастережним акцептом дійсної публічної оферти у відповідності до статті Цивільного законодавства України є факт звернення до Роботодавця за наданням відповідних послуг, який настає безпосередньо з моменту узгодження договірних питань з Оператором компанії “COMBOTAXI” після заповнення Виконавцем профілю водія у програмному додатку ”COMBOTAXI”, або після звернення у будь-який інший спосіб з використанням телекомунікаційних послуг.</li>
                            <li>Момент акцепту дійсної публічної оферти, що визначений п.3.3., вважається моментом укладання Договору. Договір, укладений за допомогою акцепту публічної оферти, має юридичну чинність у відповідності зі статтею 642 Цивільного кодексу України і є рівносильним договору, підписаному Сторонами.</li>
                            <li>Роботодавець забезпечує цілодобове програмне та апаратне функціонування ІКЦ, що дає можливість будь-якому Виконавцеві, згідно чинного Договору, звернутися через Роботодавця у будь-який час доби до Оператора та отримати від останнього послугу з надання інформації, а також здійснює аналіз інформаційних та транспортних потреб, і пошук найоптимальніших рішень для виконання отриманного Замовлення.</li>
                            <li>Виконавець може бути призначенним Оператором для виконання Замовлення, якщо для цього є потреба. Призначення на Замовлення рівнозначно визнанню Виконавцем Замовлення, що є послугою платною, яка плачується Виконацем через електронну мережу EasyPay.</li>
                          </ol>
                       </li>
                       <li>ЗОБОВ’ЯЗАННЯ РОБОТОДАВЦЯ
                          <ol className="sub-list">
                            <li>Роботодавець зобов’язується своєчасно і належним чином надавати інформаційні послуги Виконавцю.</li>
                            <li>Роботодавець зобов’язується забезпечити цілодобове безперервне функціонування ІКЦ, дотримання працівниками загальних етичних норм при спілкуванні з Виконавцями.</li>
                            <li>Роботодавець зобов’язується провести попередню підготовку працівників ІКЦ для забезпечення  належного прийому Замовлень.</li>
                            <li>Роботодавець здійснює постановку Замовлень у чергу, відслідковування Замовлень, переадресацію їх до Виконавця (за Запитом або призначенням Виконавця та згідно умов Договорів, укладених Виконавцем для здійснення своєї діяльності).</li>
                          </ol>
                       </li>
                       <li>ЗОБОВ’ЯЗАННЯ ВИКОНАВЦЯ
                          <ol className="sub-list">
                            <li>Виконавець зобов’язується повідомити правдиві персональні дані щодо адреси, місця знаходження Замовника, його номера телефону, часу та маршруту слідування до конкретного місця, а також інші необхідні дані, для здійснення діяльності Виконавця.</li>
                            <li>Виконавець зобов’язується надати у вільне використання всі запитувані у нього персональні дані Роботодавцю або Оператору ІКЦ, в тому числі про надання вказаних даних Виконавцем третім особам.</li>
                            <li>Виконавець зобов’язується не здійснювати зловживання правом на звернення за отриманням відповідної інформації, без наявної на це необхідності.</li>
                            <li>Виконавець зобов’язується не передавати будь-яку інформацію про Замовлення третім особам без попереднього узгодження з Роботодавцем.</li>
                            <li>Виконавець зобов’язаний: 
                              <ol>
                                <li>виконувати умови даного Договору;</li>
                                <li>надавати достовірні особисті дані та іншу інформацію, необхідну для виконання умов даного Договору;</li>
                                <li>попередньо перевірити працездатність програмного забезпечення на власних пристроях у безкоштовному режимі гостьового доступу; </li>
                                <li>сплачувати послуги відповідно до прейскуранту;</li>
                                <li>забезпечувати конфіденційність свого логіна і пароля;</li>
                                <li>не передавати послуги третім особам;</li>
                                <li>надати згоду Роботодавцю на обробку та використання своїх персональних даних відповідно до Закону України “Про захист персональних даних”.</li>
                              </ol>
                            </li>
                            <li>Виконавець має право: 
                              <ol>
                                <li>вимагати від Роботодавця надання послуг відповідно до умов даного Договору;</li>
                                <li>самостійно встановлювати програмне забезпечення для роботи на комп’ютерах, мобільних пристроях та інше;</li>
                                <li>у разі виникнення зауважень повідомляти про них Роботодавця письмово і своєчасно; </li>
                                <li>в односторонньому порядку відмовитися від Послуг Виконавця на умовах передбачених в п.7.3.</li>
                              </ol>
                            </li>
                            <li>Виконавець самостійно несе відповідальність за правильність здійснених ним платежів.</li>
                          </ol>
                       </li>
                       <li>ПРАВА РОБОТОДАВЦЯ
                         <ol className="sub-list">
                           <li>З метою впорядкування діяльності та забезпечення функціонування ІКЦ, Роботодавець здійснює збір інформації щодо специфіки запитів Замовлень, персональних даних Замовників.</li>
                           <li>Роботодавець має право в будь-який час в односторонньому порядку змінювати ціни і вводити нові тарифи. Датою вступу в силу нових цін чи тарифів є дата їх публікації на сайті. За 30 (тридцять) днів до введення нових цін чи тарифів Роботодавець сповіщає Виконавця шляхом відправлення повідомлення на електронну адресу Виконавця. У випадку зміни ціни раніше внесена Виконавцем оплата за новими цінами не перераховується.</li>
                         </ol>
                       </li>
                       <li>ВІДПОВІДАЛЬНІСТЬ СТОРІН
                         <ol className="sub-list">
                           <li>У випадку неналежного виконання або невиконання Виконавцем зобов’язань за даним Договором, що призвело до виникнення претензій з боку Замовника або інших третіх осіб, Виконавець зобов’язується відшкодувати самостійно прямі або непрямі збитки, втрачену вигоду або моральну шкоду Замовника.</li>
                           <li>Виконавець повністю відповідальний за збереження свого логіна і пароля і за збитки, які можуть виникнути через несанкціоноване його використання. За фактом крадіжки логіна і пароля з вини третіх осіб клієнт має право направити на адресу Роботодавця заяву про зміну логіна і пароля, з обов'язковим додатком до заяви відповідного фінансового документа, що підтверджує оплату Послуг. Роботодавець не несе відповідальність за дії третіх осіб, які спричинили крадіжку, а для відшкодування грошових коштів, витрачених на вкрадений час Виконавець повинен звернутися у відповідні слідчі і правоохоронні органи.</li>
                         </ol>
                       </li>
                       <li>ВИРІШЕННЯ СПОРІВ
                         <ol className="sub-list">
                           <li>Будь-які спори та розбіжності, що прямо або опосередковано стосуються чи випливають з цього Договору, Сторони будуть вирішувати шляхом переговорів та у передбаченому законом порядку.</li>
                           <li>Жодна із Сторін не звільняється від своїх зобов’язань за цим Договором, як при наявності будь-якого спору чи розбіжностей, так і у випадку передачі спірного питання на розгляд господарського суду.</li>
                         </ol>
                       </li>
                       <li>ОБСТАВИНИ НЕПЕРЕБОРНОЇ СИЛИ (ФОРС-МАЖОР)
                         <ol className="sub-list">
                           <li>Сторони звільняються від відповідальності за цим Договором, якщо невиконання або неналежне виконання зобов’язань було обумовлено настанням форс-мажорних обставин, таких як війни, повені, епідемії, страйки, ембарго.</li>
                         </ol>
                       </li>
                       <li>СТРОК ДІЇ ДОГОВОРУ
                         <ol className="sub-list">
                           <li>Строк дії цього Договору  - необмежений, за виключенням оговорених правовідносин та передбачених відповідно строків обслуговування з окремими суб’єктами господарської діяльності.</li>
                           <li>У разі розірвання даного Договору з ініціативи Виконавця: 
                             <ol>
                               <li>Виконавець зобов'язаний письмово попередити Роботодавця за 15 (п’ятнадцять) календарних днів до моменту його розірвання;</li>
                               <li>надіслати копії платіжних документів на адресу Роботодавця;</li>
                             </ol>
                           </li>
                         </ol>
                       </li>
                       <li>ІНШІ УМОВИ
                         <ol className="sub-list">
                           <li>Положення цього Договору не можуть бути змінені кожною зі Сторін в одностороньому порядку.</li>
                           <li>Всі додаткові документи, а саме: додатки, додаткові угоди та інші документи є невідємною частиною цього Договору, за умови їхнього відповідного підписання уповноваженими представниками Сторін.</li>
                         </ol>
                       </li>
                      </ol>
                      <div className="contact-us">
                        <p>РЕКВІЗИТИ ВИКОНАВЦЯ.</p>
                        <p>ООО "ЛОГИСТИКАОНЛАЙН"</p>
                        <p>01014, м. Киев, вул. Петра Болбочана, б. 4-А, офiс 1.</p>
                        <p>+380443647950</p>
                        <p><a href="/">combotaxi.com@gmail.com</a></p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        )
  }
}

export default PublicOffer;
