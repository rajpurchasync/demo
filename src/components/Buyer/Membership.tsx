import React, { useState } from "react";
import { CreditCard } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const Membership = () => {
  return (
    <main className="bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 py-3  lg:py-2 border-b border-gray-200">
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          <div className="flex items-center gap-1 sm:gap-2">
            {/* <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded flex items-center justify-center">
              <div className="w-3 h-3 border-2 border-white rounded-sm"></div>
            </div> */}
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
              Membership
            </h1>
          </div>
        </div>
      </div>
      <div className="max-w-[1000px] mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Memberships
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 border border-purple-200 bg-purple-50 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-purple-900">
                    Professional Plan
                  </h3>
                  <p className="text-purple-700">$29/month • Billed monthly</p>
                </div>
                <Badge className="bg-purple-600">Current Plan</Badge>
              </div>

              <div className="space-y-2 text-sm text-purple-800">
                <p>✓ Unlimited tasks and projects</p>
                <p>✓ Advanced reporting and analytics</p>
                <p>✓ Priority customer support</p>
                <p>✓ Custom integrations</p>
              </div>

              <div className="mt-4 pt-4 border-t border-purple-200">
                <p className="text-sm text-purple-700">
                  Next billing date: January 15, 2025
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline">Change Plan</Button>
              <Button variant="outline">Billing History</Button>
              <Button variant="outline">Cancel Subscription</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Membership;
