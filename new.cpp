#include <iostream>
using namespace std;

int secondHighest(int arr[], int n) {
    int highest = -1e9, second = -1e9;
    
    for (int i = 0; i < n; i++) {
        if (arr[i] > highest) {
            second = highest;
            highest = arr[i];
        } else if (arr[i] > second && arr[i] != highest) {
            second = arr[i];
        }
    }
    return second;
}

int main() {
    int arr[] = {12, 35, 1, 10, 34, 1};
    int n = sizeof(arr) / sizeof(arr[0]);
    cout << "Second highest number is: " << secondHighest(arr, n) << endl;
    return 0;
}