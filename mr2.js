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
                                        return [[object.bucket, object.key]];
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
                          "source": "function(value, key)
                                    {
                                      var data = Riak.mapValuesJson(value)[0];
                                      
                                      if(data.b == 'b')
                                        return [[value.bucket, value.key]];
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
                                      var result = {};
  
                                      if(data.c)
                                      {
                                        result[data.c] = 1;
                                        return [result];
                                      }
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
                            "source": "function reduce(values)
                                      {
                                        return  [
                                                  values.reduce(
                                                                  function(acc, item)
                                                                  {
                                                                    for(c in item)
                                                                    {
                                                                      if(acc[c])
                                                                        acc[c] += item[c];
                                                                      else
                                                                        acc[c] = item[c];
                                                                  
                                                                      return acc;
                                                                    }
                                                                  }
                                                                )
                                                ];
                                      }
                                      ",
                            "keep":true
                          }
              }
            ]
}
