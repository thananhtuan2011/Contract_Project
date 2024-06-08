// Angular
import { Injectable } from '@angular/core';
// RxJS
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { MenuServices } from './menu.service';

@Injectable()
export class MenuConfigService {
	// Public properties
	onConfigUpdated$: Subject<any>;
	// Private properties
	private menuConfig: any;

	/**
	 * Service Constructor
	 */
	user: any;
	constructor(
		private menu_services: MenuServices,
		private translate: TranslateService) {
		// register on config changed event and set default config
		this.onConfigUpdated$ = new Subject();
		this.user = JSON.parse(localStorage.getItem("user"));
	}

	/**
	 * Returns the menuConfig
	 */
	async getMenus() {
		//lấy menu phân quyền
		let res = await this.layMenu().then();
		let menu;

		menu = this.fs_Assign(res);
		console.log("Mênuuu", menu)
		return menu;
	}

	layMenu() {
		return this.menu_services.layMenuChucNang().toPromise();
	}

	fs_Assign(dt: any) {
		let config = {
			header: {
				self: {},
				items: []
			},
			aside: {
				self: {},
				items: []
			}
		};
		// let arr = [];
		dt.forEach((item, index) => {
			if (item.sub_menu.length > 0) {
				let _module = {
					title: '' + item.name_menu,
					root: item.sub_menu ? item.sub_menu.length > 0 : true,
					icon: '' + item.icon,
					page: '' + item.page,
					svg: ''
				}
				if (item.sub_menu.length > 0) {
					_module["bullet"] = 'dot';
					_module["submenu"] = [];
					item.sub_menu.forEach((itemE, indexE) => {
						let _mainmenu = {
							title: '' + itemE.name_submenu,
							idsub_menu: '' + itemE.idsub_menu,
							icon: '' + itemE.icon,
							root: itemE.sub_menu ? itemE.sub_menu.length == 0 : true,
							page: '' + itemE.page,
						};
						// *ngIf="item.idsub_menu==26&&(user.role_deparment=='all'||user.role_deparment=='admin')"
						if (itemE.idsub_menu != 26) {
							_module["submenu"].push(_mainmenu)

						}
						if (itemE.idsub_menu == 26 && (this.user.role_deparment == "all" || this.user.role_deparment == "admin")) {
							_module["submenu"].push(_mainmenu)
						}
					});
				}
				config.aside.items.push(_module);
			}
			else {
				if (item.Link != '#') {
					let _module = {
						title: '' + item.name_menu,
						root: item.sub_menu ? item.sub_menu.length == 0 : true,
						icon: '' + item.icon,
						page: '' + item.page
					};
					config.aside.items.push(_module);
				}
			}

		});
		return config;
	}

	// async GetHCRolesToLocalStorage() {
	// 	let res = await this.menuPhanQuyenServices.HCRoles().toPromise().then();
	// 	/* Check Role */
	// 	if (res.length == 0) {
	// 		alert('Bạn chưa có quyền trong hệ thống !');
	// 		window.location.href = environment.RootWeb;
	// 	}
	// 	/*------------*/
	// 	localStorage.setItem('HC_Roles', JSON.stringify(res));
	// }

	/**
	 * Load config
	 *
	 * @param config: any
	 */
	loadConfigs(config: any) {
		this.menuConfig = config;
		this.onConfigUpdated$.next(this.menuConfig);
	}
}
