import { Component, inject } from '@angular/core';
import {
  Search,
  MoreHorizontal,
  Trash2,
  Plus,
  LucideAngularModule,
} from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../Pipes/search.pipe';
import { MetalData } from '../../Shared/Classes/Metal';
import { CommonService } from '../../Services/common.service';
import { UtilService } from '../../Services/util.service';

@Component({
  selector: 'app-prices',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule, SearchPipe],
  templateUrl: './prices.component.html',
  styleUrl: './prices.component.css',
})
export class PricesComponent {
  readonly search = Search;
  readonly more_horizontal = MoreHorizontal;
  readonly delete = Trash2;
  readonly trash = Trash2;
  readonly plus = Plus;

  // declaration
  MetalList: MetalData[] = [];
  searchInput: string = '';

  // Services
  readonly commonService = inject(CommonService);
  readonly utl = inject(UtilService);

  ngOnInit() {
    this.getMetalData();
  }

  getMetalData() {
    this.commonService.getMetalPriceData().subscribe(
      (res) => {
        this.MetalList = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteRow(ID: number) {
    this.commonService.deleteMetalPrice(ID).subscribe((res) => {
      if (res) {
        this.getMetalData();
        this.utl.success("Metal Price deleted");
      }else
      {
        this.utl.error("Error while deleting metal price , please try later")
      }
      console.log(res);
    });
  }
}
