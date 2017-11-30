import {Component} from '@angular/core';

import 'node_modules/jquery/dist/jquery.min';
import 'node_modules/bootstrap/dist/js/bootstrap.min';

@Component({
    selector: 'my-app',
    styleUrls: [
    	'node_modules/bootstrap/dist/css/bootstrap.min.css',
    	'node_modules/gentelella/build/css/custom.min.css',
    	'node_modules/font-awesome/css/font-awesome.min.css',
    	'node_modules/bootstrap-daterangepicker/daterangepicker.css'
    ],
    templateUrl: './src/system/main.component.html'
})
export class AppComponent {}
