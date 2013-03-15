{
  "inputs":
            {
              "bucket":"bucket_name",
              "key_filters":
                              [
                                ["tokenize", "-", 1],
                                ["between", "1314835200", "1354320000"]
                              ]
            },
  "query":
            [
              {
                "map":
                        {
                          "language":"javascript",
                          "source": "function map(object)
                                    {
                                      var data = Riak.mapValuesJson(object)[0];

                                      if(data.a == 'a')
                                        return [data];
                                      else
                                        return [];
                                    }
                                    ",
                          "keep":false
                        }
              },
              {
                "map":
                        {
                          "language":"javascript",
                          "source": "function map(object)
                                    {
                                      var data = Riak.mapValuesJson(object)[0];

                                      if(data.b)
                                        return [1];
                                      else
                                        return [];
                                    }
                                    ",
                          "keep":false
                        }
              },
              {
              "reduce":
                        {
                          "language":"javascript",
                          "name":"Riak.reduceSum",
                          "keep":true
                        }
            }
            ]
}