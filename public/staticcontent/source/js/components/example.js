/** Зависимости прокидываем через "//=require" из папки vendor
 * Например,
 * //=require ../../vendors/somePlugin/somePluginsFile.js
 */

/** Метод для app */
// app.someComponent = (function(){
// 	// Приватим переменные
// 	var _self = this;

// 	// Фасад
// 	return {
// 		// Публикуем методы
// 		init: function(selector,options){
// 			// Инит плагина (если нужно с jQuery)
// 			$(function(){
// 				if (!$(selector).length) return;
// 				_self._element = $(selector);
// 				_self._element.draggable(options);
// 			});
// 		}
// 	}
// })();

// /** Пример структуры компонента */
// const EXAMPLE = {
// 	/** Обзательное свойство, по нему компонент будет доступен в APP */
// 	name: 'example',

// 	/** Объект для хранения свойств компонента. Хранить по "this.свойство" не рекомендуется */
// 	options: {
// 		public: true,
// 		_private: true
// 	},

// 	/** Объект для хранения данных компонента. Хранить по "this.данные" не рекомендуется */
// 	data: {
// 		public: true,
// 		_private: true
// 	},

// 	/**
// 	 * Инициализация (публичный метод)
// 	 */
// 	init: function() {
// 		this.public();
// 		/* ... */
// 	},

// 	/**
// 	 * Публичный метод, будет доступен, в данном случае, по ссылке "APP.example.public()"
// 	 */
// 	public: function() {
// 		return this._private();
// 		/* ... */
// 	},

// 	/**
// 	 * Приватный метод. Инкапсуляция достигается конвенцией по наименованию
// 	 */
// 	_private: function() {
// 		/* ... */
// 	}
// }

