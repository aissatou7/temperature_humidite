import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHistoriqueComponent } from './table-historique.component';

describe('TableHistoriqueComponent', () => {
  let component: TableHistoriqueComponent;
  let fixture: ComponentFixture<TableHistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableHistoriqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
