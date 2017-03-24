package com.weathernativenavigation;

import com.airbnb.android.react.navigation.ReactActivity;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the screen registered from JavaScript.
   */
  @Override
  protected String getInitialScreenName() {
      return "Forecast";
  }
}
