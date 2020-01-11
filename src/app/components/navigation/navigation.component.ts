import { Component, ViewChild, ElementRef } from "@angular/core";
import { MatSidenav } from "@angular/material";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"]
})
export class NavigationComponent {
  @ViewChild(MatSidenav, { static: false })
  public sidebar: MatSidenav;

  constructor(elementRef: ElementRef) {
    const hammertime = new Hammer(elementRef.nativeElement, {});
    hammertime.get("pan").set({ direction: Hammer.DIRECTION_ALL });
    hammertime.on("panright", event => {
      if (
        event.pointerType !== "mouse" &&
        event.center.x >= 1 &&
        event.center.x <= 50
      ) {
        this.sidebar.open();
      }
    });
    hammertime.on("panleft", event => {
      if (event.pointerType !== "mouse") {
        this.sidebar.close();
      }
    });
    hammertime.on("panup", event => false);
    hammertime.on("pandown", event => false);
  }
}
