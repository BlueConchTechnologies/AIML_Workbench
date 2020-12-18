
import { SpinnerDemoComponent } from './spinner-demo.component';

describe('SpinnerDemoComponent', () => {
  let component: SpinnerDemoComponent;

  const spinservice = {
    start: (x) => { },
    stop: (y) => { },
    fakeAPICall: (z) => {
      return {
        then: () => { }
      };
    }
  };

  beforeEach(() => {
    // Initializes ModalAlert Component by injecting required service
    component = new SpinnerDemoComponent(spinservice as any);
  });

  it('should create SpinnerComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should check whether showSpinner is called', () => {
    // checks for showSpinner method
    spyOn(component, 'onClick').and.callThrough();
    component.onClick();
    expect(component.onClick).toHaveBeenCalled();
  });
});
