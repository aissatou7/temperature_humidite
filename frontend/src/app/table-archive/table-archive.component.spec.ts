import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableArchiveComponent } from './table-archive.component';

describe('TableArchiveComponent', () => {
  let component: TableArchiveComponent;
  let fixture: ComponentFixture<TableArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableArchiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
