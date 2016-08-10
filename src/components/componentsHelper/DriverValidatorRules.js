export const validate = (values) => {
  const errors = {}
  if (!values.first_name) {
    errors.first_name = 'Введите имя.'
  }
  if (!values.last_name) {
    errors.last_name = 'Введите фамилию.'
  }
  if (!values.middle_name) {
    errors.middle_name = 'Введите отчество.'
  }
  if (!values.gender) {
    errors.gender = 'Укажите ваш пол.'
  }
  if (!values.birthday) {
    errors.birthday = 'Введите дату рождения.'
  }
  if (!values.second_phone) {
    errors.second_phone = 'Укажите запасной номер телефона.'
  }
  if (!values.address) {
    errors.address = 'Укажите адрес.'
  }
  if (!values.inn) {
    errors.inn = 'Укажите ваш ИНН.'
  }
  if (!values.passport) {
    errors.passport = 'Укажите серию паспорта.'
  }
  if (!values.driver_photo) {
    // errors.driver_photo = 'Добавте фото профиля.'
  }
  if (!values.car_brand) {
    errors.car_brand = 'Укажите марку авто.'
  }
  if (!values.car_model) {
    errors.car_model = 'Укажите модель авто.'
  }
  if (!values.car_color) {
    errors.car_color = 'Укажите цвет авто.'
  }
  if (!values.car_type) {
    errors.car_type = 'Укажите тип кузова.'
  }
  if (!values.car_year) {
    errors.car_year = 'Укажите год выпуска авто.'
  }
  if (!values.car_number) {
    errors.car_number = 'Укажите номер авто.'
  }
  if (!values.car_seats) {
    errors.car_seats = 'Укажите количество мест.'
  }
  if (!/^\d+$/i.test(values.email)) {
    // errors.email = 'Укажите email'
  }
  if (!values.car_photo) {
    // errors.car_photo = 'Добавте фото авто.'
  }

  return errors
}
