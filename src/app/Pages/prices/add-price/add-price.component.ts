import { Component, EventEmitter, Output, inject } from '@angular/core';
import { UtilService } from '../../../Services/util.service';
import { CategoryService } from '../../category/category.service';
import { FormsModule } from '@angular/forms';
import { Metal } from '../../../Shared/Classes/Metal';
import { PricesService } from '../prices.service';
import { CommonService } from '../../../Services/common.service';

@Component({
  selector: 'app-add-price',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-price.component.html',
  styleUrl: './add-price.component.css',
})
export class AddPriceComponent {
  readonly service = inject(PricesService);
  readonly util = inject(UtilService);
  readonly common = inject(CommonService);
  @Output() status = new EventEmitter<boolean>();

  selectedMetal!: number;
  metals: Metal[] = [];
  price: number = 0;

  ngOnInit() {
    this.getMetalList();
  }

  // Method to handle  submission
  onSubmit(): void {
    if (this.selectedMetal) {
      const saveData = {
        Metal_ID: this.selectedMetal,
        Price: this.price,
      };
      this.service.addPrice(saveData).subscribe(
        (res: any) => {
          if (res) {
            this.util.success(this.price + ' price added for metal');
            this.price = 0;
            this.status.emit(true);
          } else {
            this.util.error('Error while adding price');
          }
        },
        (err) => {
          console.error('Error adding Metal price:', err);
        }
      );
    } else {
      this.util.warn('Please select metal');
    }
  }

  onSelectMetal(event: any) {
    console.log(event);
    this.selectedMetal = event;
  }

  getMetalList() {
    this.common.getMetalList().subscribe((res: Metal[]) => {
      this.metals = res;
    });
  }

  // Method to close the modal
  closeModal(): void {
    this.status.emit(false);
  }
}
